// import { finalprint } from './finalprint.js';
const { finalprint } = require('./kcbFinalPrint')
const { MongoClient, MongoClients } = require('mongodb');
request = require('request');
fs = require('fs');
// const url = 'mongodb://0.0.0.0:27017';
const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cment-sa3-2022?retryWrites=true&w=majority';

// const client = new MongoClient(url);	

var download = function (uri, filename, callback) {
	request.head(uri, function (err, res, body) {	
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};
const doit = async () => {
// const client = new MongoClient(url);
	let mongoClient = new MongoClients();
	mongoClient = MongoClients.create(url)
	let applicationSchema = mongoClient.getDatabase("cmet-sa3-2022").getCollection('applications');
	let count = await applicationSchema.find({}).count();
	console.log('count of applications is :', count)

}

doit();

MongoClient.connect(url).then((client) => {
	const connect = client.db('cmet-sa3-2022');
//   console.log('connection is:', JSON.stringify(connect))
	// Connect to collection
	
	const collection = connect
		.collection('applications').find({})
		.toArray().then((ans) => {
    //   console.log('applicants :', JSON.stringify(ans))
			let applicant = ans[0];
			// console.log('Applicant: ', applicant);
		// 	let photosrc = `https://cmetrsuploads.s3.ap-south-1.amazonaws.com/${applicant.uploads.photo}`;
		// 	let photodest = `downloads/${applicant.uploads.photo}`;
		// 	download(photosrc, photodest, () => {
		// 		let signsrc = `https://cmetrsuploads.s3.ap-south-1.amazonaws.com/${applicant.uploads.sign}`;
		// 		let signdest = `downloads/${applicant.uploads.sign}`;
		// 		download(signsrc, signdest, () => {
		// 			let document = finalprint({ application: applicant });
        //   console.log('created finale document :', document)
		// 		})
		// 	})
			let document = finalprint({ application: applicant });
     
		});
}).catch((err) => {
	console.log('not find',err);
})

