const fs = require("fs");
const path = require("path");
const download = require('download');
const csv = require('csv-parser');
// const dbURI = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cmet-sa3-2022'
const dbURI = 'mongodb://localhost:27017/cmet-sa3-2022'
const dbName = 'cmet-sa3-2022';
const MongoClient = require('mongodb').MongoClient;
let applications;
let db

let uploadsLocation = "https://pcb01uploads.s3.ap-south-1.amazonaws.com";


const getApplications = async () => {

    let client = await MongoClient.connect(dbURI);
    db = client.db(dbName);
    const query = { $or: [{ confirmation_client: { $exists: true } }, { confirmation_server: { $exists: true } }] }
    applications = await db.collection('applications').find(query).toArray()
    console.log('total applications', applications.length)
}
const getFiles = (appid, uploads) => {
    let files = { appid, ...uploads }
    files.essentialqualificationfile = uploads.essentialqualificationfile &&
        uploads.essentialqualificationfile[0] ? uploads.essentialqualificationfile[0] : null;
    files.experiencefile = uploads.experiencefile &&
        uploads.experiencefile[0] ? uploads.experiencefile[0] : null;

    // first remove the uploaded files that are empty
    Object.keys(files).forEach(key =>  (files[key] == '') ? delete files[key]: files[key])
    // add upload locations to the files that are actually uploaded
    Object.keys(files).forEach(key => files[key] = (key != 'appid') ? `${uploadsLocation}/${files[key]}` : files[key])
    return files;
}

let downloadOne = async (src, dest) => {
    try {

        fs.writeFileSync(dest, await download(src));
        console.log('src: ', src, 'dest: ', dest, ' download successful');
    } catch {
        fs.appendFile("errors.log", `src: ${src} dest: ${dest}\n`, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
const dowloadFiles = async (source) => {
    let dest = {}
    Object.keys(source).forEach(key => {
        if (key != 'appid') {
            let extension = source[key].split('.').pop()
            dest[key] = `${__dirname}/files/${source.appid}/${key}.${extension}`
        } else {
            try {
                dirname = `${__dirname}/files/${source.appid}`;
                fs.mkdirSync(path.join(dirname));
            } catch (e) {
                // ignore error
            }
        }
    })
    Object.keys(dest).forEach(async (key) => {
        if ((!fs.existsSync(dest[key]) && source[key] != "")) {
            console.log('file: ', dest[key], 'should be downloaded')
            downloadOne(source[key], dest[key])
        }
    })
}

const runTest = async () => {
    await getApplications()
    applications.forEach(({ appid, uploads }) => {
        let files = getFiles(appid, uploads)
        // console.log(`appid: ${appid} uploads: ${JSON.stringify(files, null, 2)}`)
        dowloadFiles(files)
    })
    console.log(`uploads location is ${uploadsLocation}`)
    console.log('dirname is:', __dirname)
}

runTest();
