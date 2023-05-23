
const fs = require('fs');
const csv = require('csv-parser');
const dbURI = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cmet-sa3-2022'
const dbName = 'cmet-sa3-2022';
const MongoClient = require('mongodb').MongoClient;
let db

const paymentsDone = async () => {
    let client = await MongoClient.connect(dbURI);
    db = client.db(dbName);
    const query = { $or: [{ confirmation_client: { $exists: true } }, { confirmation_server: { $exists: true } }] }
    paymentsDoneRecs = await db.collection('applications').find(query).toArray()
    console.log('SrNo, Name, category, gender, pwd, amount')
    paymentsDoneRecs.forEach(({ personalInfo, confirmation_client, confirmation_server }, i) => {
        let amount = confirmation_client ? confirmation_client.amount / 100 : confirmation_server.amount /100
        const { name, category, gender, pwd } = personalInfo;
        console.log(`${i+1}, "${name}", ${category}, ${gender}  ${pwd} ${amount}`)
    })
}

paymentsDone();
