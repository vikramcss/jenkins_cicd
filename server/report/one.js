const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cmet-sa3-2022?retryWrites=true&w=majority'
//const url = 'mongodb://localhost:27017/cmet-rs-2021-10Feb2022'
//const dbName = 'cmet-rs-2021-10Feb2022';
const dbName = 'cmet-sa3-2022';



let getcount = async () => {
    let client;

    try {
        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        // const applicationSchema = await db.collection('applications');
        // const applications = await applicationSchema.find({$or:[{'confirmation_client': {$exists:true} },{'confirmation_server': {$exists:true} }]}).count();


        // const applicationSchema = await db.collection('applications');
        let applications = await db.collection('applications').find({ $or: [{ 'confirmation_client': { $exists: true } }, { 'confirmation_server': { $exists: true } }] }).toArray();
        // console.log('length of array is :', applications.length);
        // applications.forEach(a=> {
        //     console.log('name :', a.personalInfo.name)
        // })      

        console.log('length is ', applications.length)
        console.log('Name, Category',)

        applications.forEach(a => {
            let { name, category, mobile, email, dob } = a.personalInfo
            let { appid } = a
            let { addressLine1, addressLine2, state, district, pin } = a.permanentAddress
            let [{ qualification, subject, university, yearOfPassing, marksType }] = a.essentialQualifications

            let [{ nameOfOrganization, postHeld, experienceFrom, experienceTo, salary, duties }] = a.experiences
            let [{ qualification: lqualification, subject: lsubject, university: luniversity, yearOfPassing: lyearOfPassing, marks: lmarks, percentage }] = a.otherQualifications
            let percent;
            // let percent = a.essentialQualifications.marksType == 'Percentage' ? a.essentialQualifications.evaluation.percentage.percentage : console.log("percentage is: ",a.essentialQualifications.evaluation.percentage.percentage)
            if (a.essentialQualifications[0].marksType == 'Percentage') {
                percent = a.essentialQualifications[0].evaluation.percentage.percentage;
            } else  {
                percent = a.essentialQualifications[0].evaluation.cgpa.gpa;
            }
            console.log(`
${name.trim()},
'mobile No:${mobile} ,
'dob is'${dob},
'email:'${email}${category.trim()},
`, appid, `,
'Address :'${addressLine1},${addressLine2},${state},${district},${pin},
'qualification:'${qualification}${subject},${university},${yearOfPassing}, ${percent}
'experience':${nameOfOrganization},${postHeld}${experienceFrom}, ${experienceTo}, ${salary},${duties}
'otherQualifications': ${lqualification},${lsubject}, ${luniversity}, ${lyearOfPassing}, ${lmarks}, ${percentage}
`);

        })
    } catch (e) {
        console.log('application:', e)
    }
}
getcount()
