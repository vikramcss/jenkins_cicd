const fs = require("fs");
const path = require("path");
const download = require('download');
const csv = require('csv-parser');
const dbURI = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cmet-sa3-2022'
// const dbURI = 'mongodb://localhost:27017/cmet-sa3-2022'
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

const runTest = async () => {
    await getApplications()
    applications.forEach((a) => {
        const { printApplication, appid } = a
        const { filename: source } = printApplication
        const dest = `${__dirname}/files/${appid}/printApplication.pdf`
        downloadOne(source, dest)
    })
    console.log(`uploads location is ${uploadsLocation}`)
    console.log('dirname is:', __dirname)
}

runTest();
