const { get } = require('request');

const { DateTime } = require("luxon");

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://smbarge:csswakad%408782@cluster0.9ufne.mongodb.net/cment-rs-2021?retryWrites=true&w=majority'
//const url = 'mongodb://localhost:27017/cmet-rs-2021-10Feb2022'
//const dbName = 'cmet-rs-2021-10Feb2022';
const dbName = 'cment-rs-2021';


let currentage;
let getCorrespondenceAddress = ({ correspondenceAddress, addressOutsideIndia }) => {
    let { withinIndia, outOfIndia } = correspondenceAddress;
    // address within india
    if (addressOutsideIndia == 'No') {
        return `${withinIndia.addressLine1}, ${withinIndia.addressLine2}, district: ${withinIndia.district}, ${withinIndia.state},  ${withinIndia.pin}`
    }

    // address outside india
    return `${outOfIndia.addressLine}, state: ${outOfIndia.state}, country: ${outOfIndia.country}, ${outOfIndia.zip}`
}
let applicationEndDate = DateTime.fromISO("2022-02-10");
  const getAge = (ldob) => {
    if (ldob) {
      let dob = DateTime.fromFormat(ldob, "dd-MM-yyyy");
      const diff = applicationEndDate.diff(dob, ["years", "months", "days"]);
      return `${diff.values.years}Y-${diff.values.months}M-${diff.values.days}D`;
    }
   
  };


let getQualifications = ({ essentialQualifications }) => {
    let str_qualification = '';
    essentialQualifications.forEach((q) => {
        let { qualification } = q;
        str_qualification += str_qualification.length > 0 ? ', ' : '';
        str_qualification += qualification;
        switch (qualification) {
            case 'M.Tech':
            case 'M.E.':
                switch (q.mtechME.marksType) {
                    case 'CGPA':
                        str_qualification += ` CGPA: ${q.mtechME.cgpa.gpa}`
                        break;
                    case 'Percentage':
                        str_qualification += ` %: ${q.mtechME.percentage.percentage}`;
                        break;
                }
                break;
            case 'Ph.d':
                str_qualification += ` DOA: ${q.phD.dateOfAward}`;
                break;
        }
    });
    return str_qualification;
}
let getExperience = ({ experiences }) => {
    let years = 0;
    let months = 0;
    try {
        let str_experience = '';
        if (experiences && experiences.length) {
            experiences.forEach((e) => {
                str_experience += str_experience.length > 0 ? ', ' : '';
                str_experience += `  ${e.nameOfOrganization}`

                str_experience += `  ${e.postHeld}`

                    let fromMonth = e.experienceFrom.split('-')[0];
                    let fromYear = e.experienceFrom.split('-')[1];
              
                    let toMonth = e.experienceTo.split('-')[0];
                    let toYear = e.experienceTo.split('-')[1];
              
                    let fromDt = DateTime.fromObject({ month: Number(fromMonth), year: Number(fromYear) });
                    let toDt = DateTime.fromObject({ month: Number(toMonth), year: Number(toYear) });
              
                    let duration = toDt.diff(fromDt, ['years', 'months'])
              
                    str_experience+=` [${duration.years}:Y ${duration.months}:M]`
                  
                 
            })
        }
        return` ${str_experience}`
    } catch (e) {
        console.log(e)

    }
}



  
let getpatentCount= ({ achievements })=>{
    if (achievements && achievements.patent && achievements.patent.length > 0){
        return achievements.patent.length;
        
    }
    return 0;
}
let getpulishedpaperCount=({achievements})=>{
    if(achievements && achievements.publishedPapers && achievements.publishedPapers.length > 0){
        return achievements.publishedPapers.length;
    }
    return 0;
}
let getprojectCount=({achievements})=>{
    if(achievements && achievements.project && achievements.project.length > 0){
        return achievements.project.length
    }
return 0;
} 
let gettechnoldevelopeCount=({achievements})=>{
    if(achievements && achievements.technologyDeveloped && achievements.technologyDeveloped.length >0){
        return achievements.technologyDeveloped.length
    }
    return 0;
}
 
let gettechnologytransferCount=({achievements})=>{
    if(achievements && achievements.technologyTransferred && achievements.technologyTransferred.length > 0){
        return achievements.technologyTransferred.length
    }
    return 0;
}

let getawardCount=({achievements})=>{
    if(achievements && achievements.award && achievements.award.length > 0){
        return achievements.award.length
    }
    return 0;
}



(async function () {
    let client;

    try {
        client = await MongoClient.connect(url);

        const db = client.db(dbName);
        const applicationSchema = await db.collection('applications');
        const applications = await applicationSchema.find({ 'confirmation_client': { $exists: true } });
        let candidateCount = 0;
        await applications.forEach(({
            personalInfo,
            correspondenceAddress,
            addressOutsideIndia,
            essentialQualifications,
            achievements,
            experiences
        }) => {
            let c_address = getCorrespondenceAddress({correspondenceAddress,addressOutsideIndia}).split("\t").join(" ")
            let { name, email, mobile, dob,category,pwd} = personalInfo;
            currentAge = getAge(personalInfo.dob).split("\t").join(" ");
            let getQualifications1 = getQualifications({essentialQualifications}).split("\t").join(" ")
            let getExperience1 = getExperience({experiences}).split("\t").join(" ") 
            let patentCount = getpatentCount ({achievements})
            let publishedPapersCount = getpulishedpaperCount({achievements})
            let projectCount = getprojectCount({achievements})
            let technologyDevelopedCount = gettechnoldevelopeCount({achievements})
            let technologyTransferredCount = gettechnologytransferCount({achievements})
            let awardCount = getawardCount({achievements})
            let nameAddEmailMob =`${name} ${c_address} ${email} ${mobile}`
            nameAddEmailMob.split("\t").join(" ")
            let Recognition = '0';
            console.log(`${nameAddEmailMob}\t${category} ${pwd == 'No'?'':'pwd:'+personalInfo.pwd+personalInfo.PWDType}\t${dob} ${currentAge}\t${getQualifications1} \t${getExperience1}\t${patentCount} \t${publishedPapersCount}\t ${projectCount} \t${technologyDevelopedCount} \t${technologyTransferredCount} \t${awardCount} \t${Recognition}`);

            candidateCount++;
        })
        //console.log('total candidate count: ', applications.length);
        //console.log('total candidate count: ', candidateCount);
    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    //  client.close();
})();
