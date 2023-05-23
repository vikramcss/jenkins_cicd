const { get } = require('request');
let { DateTime } = require('luxon')


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cment-rs-2021?retryWrites=true&w=majority'
//const url = 'mongodb://localhost:27017/cmet-rs-2021-10Feb2022'
//const dbName = 'cmet-rs-2021-10Feb2022';
const dbName = 'cment-rs-2021';

const getTotalExperience = ({experiences}) => {
    let years = 0;
    let months = 0;

    if (experiences && experiences.length) {
    experiences.forEach(e => {
      let fromMonth = e.experienceFrom.split('-')[0];
      let fromYear = e.experienceFrom.split('-')[1];

      let toMonth = e.experienceTo.split('-')[0];
      let toYear = e.experienceTo.split('-')[1];

      let fromDt = DateTime.fromObject({ month: Number(fromMonth), year: Number(fromYear) });
      let toDt = DateTime.fromObject({ month: Number(toMonth), year: Number(toYear) });

      let duration = toDt.diff(fromDt, ['years', 'months'])
   
      years += duration.values.years;
      months += duration.values.months;
    })
    while (months >= 12) {
      months = months - 12;
      years = years + 1;
    }
}
    // return `${years}  ${years > 1 ? 'years' : 'year'} and ${months} ${months > 1 ? 'months' : 'month'}`
    return `${years}:Y ${months}:M`
}


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
            experiences
           
        }) => {
            let {name,email} = personalInfo
            let experience = getTotalExperience({experiences})
            console.log(` ${name} ${email} ${experience}`);
            candidateCount++;
        })
        //console.log('total candidate count: ', applications.length);
        // console.log('total candidate count: ', candidateCount);
    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    //  client.close();
})();
