request = require('request');
const fs = require('fs');
const AWS = require('aws-sdk');
const { finalprint } = require('./finalprint')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const bucketName = 'pcb01uploads';
const region = 'ap-south-1';
const accessKeyId = 'AKIASBOROETZ2N5PRX4X';
const secretAccessKey = '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';

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
});
const uploadFile = (srcFileName, awsFileName, cb) => {
  console.log('srcFileName: ', srcFileName)
  console.log('awsFileName: ', awsFileName)
  let data = fs.createReadStream(srcFileName);
  const params = {
    Bucket: bucketName,
    Key: awsFileName, // file will be saved as testBucket/contacts.csv
    Body: data,
    ACL: 'public-read',
    contentType: 'application/pdf',
  };
  s3.upload(params, function (s3Err, data) {
    if (s3Err) {
      console.log('s3Err ', s3Err)
      return cb(-1, null)
    }
    console.log(`File uploaded successfully at ${data.Location}`)
    cb(0, data.Location)
  });
};;


// const url = 'mongodb://0.0.0.0:27017';
// const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cment-rs-2021?retryWrites=true&w=majority'
const dbName = 'cment-rs-2021';

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const createPdfAndUpload = (applicant) => {
  let photosrc = `https://pcb01uploads.s3.ap-south-1.amazonaws.com/${applicant.uploads.photo}`;
  let photodest = `downloads/${applicant.uploads.photo}`;
  download(photosrc, photodest, () => {
    let signsrc = `https://pcb01uploads.s3.ap-south-1.amazonaws.com/${applicant.uploads.sign}`;
    let signdest = `downloads/${applicant.uploads.sign}`;
    download(signsrc, signdest, () => {
      let document = finalprint({ application: applicant });
      fs.unlink(photodest, (err) => {
        if (err) console.log('error in deleting the temp photfile: ', photodest)
      });
      fs.unlink(signdest, (err) => {
        if (err) console.log('error in deleting the temp signfile: ', signdest)
      })
      let awsFileName = document.split('/')[2];
      uploadFile(document, awsFileName, (err, awsFileName) => {
        if (err) return [-1, '']
        console.log('created finale document :', document)
        console.log('aws file location is  :', JSON.stringify(awsFileName, null, 2))
      fs.unlink(document, (err) => {
        if (err) console.log('error in deleting the temp signfile: ', signdest)
      })
        return [0, awsFileName];

      })
    })
  })
}
(async function () {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    const applicationSchema = await db.collection('applications');
    const applications = await applicationSchema.find({ 'confirmation_client': { $exists: true } });
    let i = 0;
    applications.forEach((a) => {
      console.log('index is: ', i)
      if (a.achievements.technologyDeveloped) createPdfAndUpload(a)
      i++;
    })
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  //  client.close();
})();
