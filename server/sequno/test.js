const { MongoClient } = require('mongodb')
const autoIncrement = require('mongo-autoincrement') // or import autoIncrement from 'mongo-autoincrement'
 
let mongoUri='mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cmet-sa3-2022?retryWrites=true&w=majority'
let dbName = 'cmet-sa3-2022';
;(async () => {
  // connect to mongodb server
  const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true })
 
  // get mongo database instance
  const db = client.db(dbName)
  const appid = await autoIncrement(db, 'applications', 'appid')
  console.log('generated autoIncrement is: ', appid)
})()
