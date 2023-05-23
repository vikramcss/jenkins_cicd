const { get } = require('request');
const MongoClient = require('mongodb').MongoClient;
let { DateTime } = require('luxon')

const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cment-rs-2021?retryWrites=true&w=majority'
//const url = 'mongodb://localhost:27017/cmet-rs-2021-10Feb2022'
//const dbName = 'cmet-rs-2021-10Feb2022';
const dbName = 'cment-rs-2021';




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
            essentialQualifications
        }) => {

let getQualifications = ({ essentialQualifications }) => {
    let str_qualification = '';
    
   personalInfo,essentialQualifications.forEach((q) => {
        let { qualification } = q;
        str_qualification += str_qualification.length > 0 ? ', ' : '';
        //  str_qualification += qualification;
        switch (qualification) {
            case 'M.Tech':
            case 'M.E.':
                switch (q.mtechME.marksType) {
                    case 'CGPA':
                        if(q.mtechME.cgpa.gpa >= '7.00'){
                            return str_qualification += `${personalInfo.name}  ${q.qualification} CGPA:  ${q.mtechME.cgpa.gpa} `
                        }
                        break;
                    case 'Percentage':
                        if(q.mtechME.percentage.percentage >= '60'){
                            return  str_qualification += `${personalInfo.name}  ${q.qualification} %: ${q.mtechME.percentage.percentage}`;

                            }
                        break;
                }
                break;
            // case 'Ph.d':
            //     str_qualification += ` DOA: ${q.phD.dateOfAward}`;
            //     break;
        }
    });
    return str_qualification;
}

            let {name} = personalInfo
            let qualification = getQualifications({essentialQualifications})
            console.log(` ${qualification}`);
            candidateCount++;
        })
        //console.log('total candidate count: ', applications.length);
        //  console.log('total candidate count: ', candidateCount);
    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    //  client.close();
})();