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


const runTest = async () => {
    await getApplications()
    let notPrinted = applications.filter(a=> !a.printApplication)
    let apps = notPrinted.map(({ appid, personalInfo }) => {
        const { email } = personalInfo
        return {appid, email}
    })
    let emails = apps.map(np=> np.email)
    const query = {email: {$in: emails} }
    const users = await db.collection('users').find(query).toArray()
    console.log('query: ', query)
    for(let i=0; i < apps.length; i++) {
        const found = users.find(u=> u.email == apps[i].email)
        if(found) {
            apps[i].password = found.password
        } else {
            apps[i].password = 'password not found'
        }
    }    
    console.log('application not printed: ', apps)
}

runTest();
