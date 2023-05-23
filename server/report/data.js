const { get } = require('request');
let { DateTime } = require('luxon')


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cment-rs-2021?retryWrites=true&w=majority'
//const url = 'mongodb://localhost:27017/cmet-rs-2021-10Feb2022'
//const dbName = 'cmet-rs-2021-10Feb2022';
const dbName = 'cment-rs-2021';

let applicationEndDate = DateTime.fromISO("2022-02-10");
let getAge = (ldob) => {
  if (ldob) {
    let dob = DateTime.fromFormat(ldob, "dd-MM-yyyy");
    const diff = applicationEndDate.diff(dob, ["years", "months", "days"]);
    // return `age: ${diff.values.years} years ${diff.values.months} months ${diff.values.days} days`;
    return `age: ${diff.values.years} years `;

  }

};


// let getexceptional = ({personalInfo}) => {
    
//    let {exceptionalCandidate} = personalInfo
//    if(exceptionalCandidate == 'Yes') {
//        return `${personalInfo.name} exception: ${personalInfo.exceptionalCandidate}  reason: ${personalInfo.exceptionalCandidateJustification}`
//    }


//     // return ` ${exceptionalCandidate == 'Yes'?''+ personalInfo.name:''}${exceptionalCandidate == 'Yes'?'exceptionalCandidate:'+ personalInfo.exceptionalCandidate:''} ${exceptionalCandidate == 'Yes' ?'reason: '+personalInfo.exceptionalCandidateJustification : ''}`

// }





(async function () {
    let client;

    try {
        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        const applicationSchema = await db.collection('applications');
        const applications = await applicationSchema.find({ 'confirmation_client': { $exists: true } });
        let candidateCount = 0;
        // console.log('Name and Address\t Category/PWD \t Gender \t DOB \t Qualification\t experience' );
        await applications.forEach(({
            personalInfo,
            
        }) => {
           
            //  let exception = getexceptional({personalInfo})
             let currentage = getAge (personalInfo.dob)
          let {exceptionalCandidate,} = personalInfo
            //  console.log(` ${exception}`)
             let a = (`${exceptionalCandidate == 'Yes'?''+personalInfo.name:''} ${exceptionalCandidate == 'Yes'?''+personalInfo.email:''} ${exceptionalCandidate == 'Yes'?''+personalInfo.mobile:''} ${exceptionalCandidate == 'Yes'?''+currentage:''} ${exceptionalCandidate == 'Yes'?'exceptionalCandidate:'+personalInfo.exceptionalCandidate:''} ${exceptionalCandidate == 'Yes' ?'reason: '+personalInfo.exceptionalCandidateJustification : ''}`);
             console.log(a)
            candidateCount++;
        })

    
    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    //  client.close();
})();
