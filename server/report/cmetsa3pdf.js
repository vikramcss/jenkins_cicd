
var fs = require('fs');
var PdfPrinter = require('pdfmake');
let { DateTime } = require('luxon')
const uniqid = require('uniqid')
let confirmation_client;
let confirmation_server;

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

exports.finalprint = ({ application }) => {

  let payment_confirmation = application.confirmation_client ? application.confirmation_client : application.confirmation_server;

  const getEssentialQualificationTitle = () => {
    let degrees = '';
    let adegrees = [];
    let fontSize = 10;
    application.essentialQualifications.forEach(q => {
      degrees += degrees.length > 0 ? ', ' : '';
      if (degrees.length) {
        adegrees = [...adegrees, { text: ',', fontSize }];
      }
      degrees += q.qualification;
      adegrees = [...adegrees, { text: q.qualification, fontSize }];
    })
    return adegrees;
  }


  const getTotalExperience = () => {
    let years = 0;
    let months = 0;


    if (!application.experiences) return [{ text: 'nil' }];

    if (application.experiences.length == 0) return [{ text: 'nil' }];

    application.experiences.forEach(e => {
      let fromDay = e.experienceFrom.split('-')[0];
      let fromMonth = e.experienceFrom.split('-')[1];
      let fromYear = e.experienceFrom.split('-')[2];

      let toDay = e.experienceTo.split('-')[0];
      let toMonth = e.experienceTo.split('-')[1];
      let toYear = e.experienceTo.split('-')[2];

      let fromDt = DateTime.fromObject({ day: fromDay, month: Number(fromMonth), year: Number(fromYear) });
      let toDt = DateTime.fromObject({ day: toDay, month: Number(toMonth), year: Number(toYear) });

      let duration = toDt.diff(fromDt, ['years', 'months'])
      console.log('from is:', JSON.stringify(fromDt));
      console.log('to is:', JSON.stringify(toDt));
      console.log('duration is:', duration.values);
      years += duration.values.years;
      months += duration.values.months;
    })
    while (months >= 12) {
      months = months - 12;
      years = years + 1;
    }
    // return `${years}  ${years > 1 ? 'years' : 'year'} and ${months} ${months > 1 ? 'months' : 'month'}`
    return [{ text: years, fontSize: 11 }, years > 1 ? { text: ' years and ', fontSize: 10 } : { text: ' year, and ', fontSize: 10 }, { text: months, fontSize: 10 }, months > 1 ? { text: ' months', fontSize: 10 } : { text: ' month', fontSize: 10 }]
  }
  //  

  var options = { format: 'A4', header: { "height": "5mm" }, footer: { "height": "5mm" }, border: { top: '30px', bottom: '30px', left: '10px' } }
  var fonts = {
    Roboto: {
      normal: 'report/fonts/Roboto-Regular.ttf',
      bold: 'report/fonts/Roboto-Medium.ttf',
      italics: 'report/fonts/Roboto-Italic.ttf',
      bolditalics: 'report/fonts/Roboto-MediumItalic.ttf'
    }
    //   Roboto: {
    //   normal: 'fonts/Roboto-Regular.ttf',
    //   bold: 'fonts/Roboto-Medium.ttf',
    //   italics: 'fonts/Roboto-Italic.ttf',
    //   bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    // }

  };

  //   let uploadsLocation = "https://cmetrsuploads.s3.ap-south-1.amazonaws.com";
  //   let photoUrl = application.uploads.photo ? `${uploadsLocation}/${application.uploads.photo}` : null;
  //   let signUrl = application.uploads.sign ? `${uploadsLocation}/${application.uploads.sign}` : null;
  var printer = new PdfPrinter(fonts);
  let header =
    [
      {
        image: 'report/cmet.jpeg',
        //  image: 'cmet.jpeg',

        alignment: 'top',
        width: 80,
        height: 20,
        margin: [200, -10, 0, -10]
      },
      {
        fontSize: 16, bold: true,
        alignment: 'top',
        text: 'C-MET Online Application Form ',
        style: 'header', margin: [150, 13, 0, 0]
      },
      {
        fontSize: 10, bold: true,
        alignment: 'center',
        text: 'Post Of Scientific Assistant-III  2022',
        margin: [0, 0, 0, 30]
      },

      {
        alignment: 'left',
        text: [{ text: application.personalInfo.name.toUpperCase() + " ", fontSize: 16 }, { text: getEssentialQualificationTitle(), fontSize: 8 }],
        margin: [0, 0, 0, 0]
      },
      {
        bold: true,
        text: `AppId:${application.appid}`,
        margin: [400, -15, 0, 0]
      },
      // {
      //   fontSize: 12, bold: false,
      //   alignment: 'left',
      //   text: getEssentialQualificationTitle(),
      //   margin: [0, 0, 0, 5]
      // },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: .5 }]
      },
      // {
      //   fontSize: 9, bold: false,
      //   alignment: 'left',
      //   text: `${application.personalInfo.category}, ${application.personalInfo.gender}, ${application.personalInfo.dob}, ${application.personalInfo.email}, ${application.personalInfo.mobile}, ${application.personalInfo.religion}, ${application.personalInfo.nationality} ${application.personalInfo.pwd == 'No' ? '' : ', Differently abled: ' + application.personalInfo.PWDType}`,
      //   margin: [0, 5, 0, 0],

      // },
      // {
      //   fontSize: 9, bold: true,
      //   alignment: 'left',
      //   text: 'Father Name:' + `${application.personalInfo.fathersName}`,
      //   margin: [0, 5, 0, 0]
      // }{

      {
        columns: [
          [
            {
              text: [

                { text: `Present Name:\t`, fontSize: 8 },
                { text: `${application.personalInfo.PresentName}`, fontSize: 10, bold: true },
              ], margin: [0, 0, 0, 5]
            },
            {
              text: [

                { text: `Father's/ husbend's Name:\t`, fontSize: 8 },
                { text: `${application.personalInfo.fathersName }`, fontSize: 10, bold: true },
              ], margin: [0, 0, 0, 5]
            },
            {
              text: [

                { text: `Date of Birth:\t`, fontSize: 8 },
                { text: `${application.personalInfo.dob}`, fontSize: 10, bold: true, },
              ], margin: [0, 0, 0, 5]
            },

            {
              text: [

                { text: `Mobile No:\t\t`, fontSize: 8, },
                { text: `${application.personalInfo.mobile}`, fontSize: 10, bold: true, },
              ], margin: [0, 0, 0, 5]
            },
            {
              text: [

                { text: `Email: \t\t\t\t`, fontSize: 8 },
                { text: `${application.personalInfo.email}`, fontSize: 10, bold: true, },
              ], margin: [0, 0, 0, 5]
            }],

          [
            {
              text: [

                { text: `Gender: \t\t`, fontSize: 8 },
                { text: `${application.personalInfo.gender}`, fontSize: 10, bold: true, },
              ], margin: [-60, 0, 0, 5]
            },
            {
              text: [

                { text: `Category: \t`, fontSize: 8 },
                { text: `${application.personalInfo.category}`, fontSize: 10, bold: true, },
              ], margin: [-60, 0, 0, 5]
            },
            {
              text: [
                { text: `Religion: \t\t`, fontSize: 8 },
                { text: `${application.personalInfo.religion}`, fontSize: 10, bold: true, },
              ], margin: [-60, 0, 0, 5]
            },
            {
              text: [
                { text: `Nationality: \t`, fontSize: 8 },
                { text: `${application.personalInfo.nationality}`, fontSize: 10, bold: true, },
              ], margin: [-60, 0, 0, 5]
            }
          ],

        ],
        margin: [0, 10, 0, 0]


      }

    ]
  let header2 = {

    columns: [

      { width: 10, text: '' }, {
        width: 'auto',
        table: {
          widths: [340], heights: [25],

          body: [
            [
              {
                border: [false, false, false, false],
                fontSize: 14, bold: true, text: application.personalInfo,
              },
            ],
            [
              {
                border: [false, false, false, false],
                fontSize: 10,
                columns: [

                  {
                    margin: [-10, -30, 0, 0],
                    table: {
                      body: [
                        [{ border: [false, false, false, false], bold: false, margin: [-10, 0, 0, 0], fontSize: 8, text: 'Permanent Address: \n\n' }],
                        [{ border: [false, false, false, false], bold: false, margin: [-10, -7, 0, 0], fontSize: 11, text: application.permanentAddress.addressLine1 + ', ' + application.permanentAddress.addressLine2 + ', ' + application.permanentAddress.state + ', ' + application.permanentAddress.district + ', ' + application.permanentAddress.pin }]
                      ]
                    }
                  },
                  {
                    margin: [0, -30, 0, 0],
                    table: {
                      body: [
                        [{ border: [false, false, false, false], bold: false, fontSize: 8, text: 'Correspondence Address:' }],
                        [{ border: [false, false, false, false], bold: false, margin: [-2, 0, 0, 0], fontSize: 11, text: application.correspondenceAddress.addressLine1 + ', ' + application.correspondenceAddress.addressLine2 + ', ' + application.correspondenceAddress.state + ', ' + application.correspondenceAddress.district + ', ' + application.correspondenceAddress.pin }]
                      ]
                    }
                  }
                ]
              },
            ],
            [
              {
                border: [false, false, false, false],
                fontSize: 10,
                columns: [

                  {
                    margin: [-10, 15, 0, 0],
                    table: {
                      body: [
                        [{ border: [false, false, false, false], bold: false, margin: [-10, 0, 0, 10], fontSize: 8, text: 'Experience:' }],
                        [{ border: [false, false, false, false], bold: false, margin: [-10, -7, 0, 0], fontSize: 11, text: getTotalExperience() }]
                      ]
                    }
                  },
                ]
              },

            ],
            [
              {
                border: [false, false, false, false],
                fontSize: 10,
                columns: [

                  //   {
                  //     margin: [-10, 0, 0, 0],
                  //     table: {
                  //       body: [
                  //         [{ border: [false, false, false, false], bold: false, margin: [-10, 0, 0, 10], fontSize: 8, text: 'Achievements:' }],
                  //         [{ border: [false, false, false, false], bold: false, margin: [-10, -7, 0, 0], fontSize: 11, text: getTotalAchievements() }]
                  //       ]
                  //     }
                  //   },
                ]
              },

            ]

          ]
        },

      },

      {
        margin: [30, -80, 0, 0],
        table: {
          headerRows: 1,
          body: [
            [{
              image: `report/downloads/${application.uploads.photo}`,
              //  image:"cmet.jpeg",
              width: 100,
              height: 100,



            },],
            [{
              image: `report/downloads/${application.uploads.sign}`,
              //  image:"cmet.jpeg",
              width: 50,
              height: 30,
              alignment: 'center',

            }
            ]
          ],
        }
      },

    ],
    margin: [0, 15, 0, 10]
  };



  let qual = {
    widhth: 80,
    fontSize: 14, bold: true, text: 'Essential Qualification:  \n\n',
    margin: [0, 15, 0, 0],
  }



  let displayQualifications = {
    table: {
      widths: [90, 90, 90, 80, 60, 60],
      body: [
      ],


    },
    margin: [0, 10, 0, 20],
  }
  let other = {
    widhth: 80,
    fontSize: 14, bold: true, text: 'Other Qualification:  \n\n',
    margin: [0, 20, 0, 0]
  }


  let other1 = {
    table: {
      widths: [90, 90, 90, 80, 60, 60],
      body: [
      ]
    },
    margin: [0, 0, 0, 20]
  }


  let exper = {
    bold: true, fontSize: 14, widhth: 80,
    text: 'Experience:',
    margin: [0, 20, 0, 10]
  }
  let experience1 = {
    fontSize: 10, margin: [0, 0, 0, 20],
    table: {
      widths: [90, 90, 90, 80, 60, 60],
      body: [

      ]
    },

  }



  let Additional = {

    fontSize: 14,
    bold: true, widhth: 80,
    text: 'Additional Information: \n\n',
    margin: [0, 20, 0, 0],
  }

  let additionalInformation = {
    fontSize: 10, ul: [{
      text: application.additionalInformation,

      margin: [0, 0, 0, 20]
    }]
  }

  let declare = {
    bold: true, fontSize: 14, widhth: 80,
    text: ' Declaration:  \n\n',
    margin: [0, 20, 0, 0]
  }

  let line = {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
  }

  let Declaration = {
    fontSize: 10,
    text: 'I hereby declare that I have carefully read and fully understood all the instructions and details pertaining to the post being applied by me and all statements made and information furnished in this application are true and complete to the best of my knowledge and beliefI also declare that I have not concealed any material information which may debar my candidature for the post applied for. In the event of suppression or distortion of any fact including category, age or educational qualification, experience etc. made in my application form, I understand that I will be denied any employment in the organization and if already employed on any of the posts in the Institute, my services will be terminated forthwith without notice.',
    margin: [0, 0, 0, 0]
  }

  let dd = {
    footer: {

      columns: [
        { text: `Date:${DateTime.now().setZone('Asia/Calcutta').toLocaleString(DateTime.DATE_MED)} ${DateTime.now().setZone('Asia/Calcutta').toLocaleString(DateTime.TIME_SIMPLE)}`, alignment: 'left', margin: [20, 10, 40, 0], fontSize: 8 }
      ]
    },

    background: function (currentPage, pageSize) {            //border
      return {

        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 575,
            h: 820,
            r: 2,
            lineColor: 'black',
            text: 'date',

          },

        ],

        margin: 10
      }
    },

    content: [
      header,
      {},
      header2,
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
      },
      qual,
      displayQualifications,
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
      },
      other,
      other1,
      {},
      exper,
      experience1,




    ] //content end

  } // dd end

  var options = {

  }
  // console.log('output', JSON.stringify(dd.content[0].columns, null, 2));
  let qualificationEntry = [{
    "fontSize": 10,
    "text": "M.Tech"
  },
  {
    "fontSize": 10,
    "text": "Chemical Engg."
  },
  {
    "fontSize": 10,
    "text": "Delhi university "
  },
  {
    "fontSize": 10,
    "text": "2021"
  },
  {
    "fontSize": 10,
    "text": "700"
  },
  {
    "fontSize": 10,
    "text": "50"
  },
  ]

  let sevenEntry = [{}, {}, {}, {}, {}, {}, {}]

  let addressEntry = [{}]

  let achievementsEntry = [{}, {}, {}]

  let otherEntry = [{}]
  let paymentEntry = [{}, {}]

  const getEssentialQualificationsFormatted = () => {
    let body = [];
    const qa = JSON.parse(JSON.stringify(qualificationEntry));
    qa[0].text = 'Qualification'
    qa[0].alignment = 'center',
      qa[0].fontSize = '10',
      qa[0].bold = 'true',
      qa[1].text = 'Subject',
      qa[1].alignment = 'center',
      qa[1].fontSize = '10',
      qa[1].bold = 'true',
      qa[2].text = 'University',
      qa[2].alignment = 'center',
      qa[2].fontSize = '10',
      qa[2].bold = 'true',
      qa[3].text = 'Year of Passing', qa[3].alignment = 'center', qa[3].fontSize = '10', qa[3].bold = 'true',
      qa[4].text = 'Marks/CGPA/DOA', qa[4].alignment = 'center', qa[4].fontSize = '10', qa[4].bold = 'true',
      qa[5].text = 'Percentage', qa[5].alignment = 'center', qa[5].fontSize = '10', qa[5].bold = 'true',
      body = [...body, qa]

    application.essentialQualifications.forEach(entry => {
      const qe = JSON.parse(JSON.stringify(qualificationEntry));

      let subject;
      let university;
      let yearOfPassing;
      let marksCGPA;
      let percentage = '-';


      if (entry.marksType != 'CGPA') {

        subject = entry.subject
        university = entry.university
        yearOfPassing = entry.yearOfPassing
        marksCGPA = entry.evaluation.percentage.marks;
        percentage = entry.evaluation.percentage.percentage;
      } else {
        subject = entry.subject
        university = entry.university
        yearOfPassing = entry.yearOfPassing
        marksCGPA = entry.evaluation.cgpa.gpa;
        percentage = '-';
      }

      qe[0].text = entry.qualification;
      qe[1].text = subject;
      qe[2].text = university;
      qe[3].text = yearOfPassing;
      qe[4].text = marksCGPA;
      qe[5].text = percentage;



      body = [...body, qe] // this is part of dd
    });
    return body;
  }

  const getOtherQualificationsFormatted = () => {
    let body = [];
    const qa = JSON.parse(JSON.stringify(qualificationEntry));


    qa[0].text = 'Qualification', qa[0].alignment = 'center', qa[0].fontSize = '10', qa[0].bold = 'true',
      qa[1].text = 'Subject', qa[1].alignment = 'center', qa[1].fontSize = '10', qa[1].bold = 'true',
      qa[2].text = 'University', qa[2].alignment = 'center', qa[2].fontSize = '10', qa[2].bold = 'true',
      qa[3].text = 'Year of Passing', qa[3].alignment = 'center', qa[3].fontSize = '10', qa[3].bold = 'true',
      qa[4].text = 'Marks/CGPA', qa[4].alignment = 'center', qa[4].fontSize = '10', qa[4].bold = 'true',
      qa[5].text = 'Percentage', qa[5].alignment = 'center', qa[5].fontSize = '10', qa[5].bold = 'true',
      //  qe[6].text ='doi',
      body = [...body, qa]

    application.otherQualifications.forEach(entry => {
      const qe = JSON.parse(JSON.stringify(qualificationEntry));

      qe[0].text = entry.qualification;
      qe[1].text = entry.subject
      qe[2].text = entry.university
      qe[3].text = entry.yearOfPassing
      qe[4].text = entry.marks;
      qe[5].text = entry.percentage;

      body = [...body, qe] // this is part of dd
    });
    return body;
  }

  const getExperienceFormatted = () => {
    let body = [];
    // let experience_entry = [
    //   {
    //     alignment: 'top',
    //     text: '',
    //     margin: [0, 0, 0, 0]
    //   },
    //   {
    //     alignment: 'top',
    //     text: '',
    //     margin: [0, 0, 0, 0]
    //   },
    //   {
    //     alignment: 'top',
    //     text: '',
    //     margin: [0, 0, 0, 10]
    //   },
    // ];
    const qa = JSON.parse(JSON.stringify(qualificationEntry));

    qa[0].text = 'Name of organization', qa[0].alignment = 'center',
      qa[1].text = 'PostHeld', qa[1].alignment = 'center',
      qa[2].text = 'ExperienceFrom', qa[2].alignment = 'center',
      qa[3].text = 'ExperienceTo', qa[3].alignment = 'center',
      qa[4].text = 'Salary', qa[4].alignment = 'center',
      qa[5].text = 'Duties', qa[5].alignment = 'center',

      body = [...body, qa]

    application.experiences.forEach(entry => {
      const qe = JSON.parse(JSON.stringify(qualificationEntry));

      qe[0].text = entry.nameOfOrganization;
      qe[1].text = entry.postHeld;
      qe[2].text = entry.experienceFrom;
      qe[3].text = entry.experienceTo;
      qe[4].text = entry.salary;
      qe[5].text = entry.duties;

      body = [...body, qe]

    })



    // if (application.experiences && application.experiences.length) {

    //   application.experiences.forEach(entry => {
    //     experience_entry[0].text = [
    //       { text:  'PostHeld:\t', fontSize: 8, bold: false, margin: [0, 0, 40, 0] },
    //       { text: `${entry.postHeld}, `, fontSize: 12, bold: false, margin: [0, 0, 40, 0] },
    //       { bold: false, text: 'NameOfOrganization: \t', fontSize: 8 ,margin:[0,0,0,0]},
    //       { bold: false, text: `${entry.nameOfOrganization}`, fontSize: 10 }
    //     ];
    //     experience_entry[1].text = [
    //       { text: 'Duration:\t ', fontSize: 8, bold: false },
    //       { text: `from ${entry.experienceFrom} to:${entry.experienceTo}`, bold: false, fontSize: 10, margin: [30, 0, 30, 0] },
    //       { text: ' Salary: \t', fontSize: 8, bold: false, },
    //       { text: `Rs. ${entry.salary}/mo`, bold: false, fontSize: 10 },
    //     ];
    //     experience_entry[2].text = [{ text: 'Duties: \t', fontSize: 8, bold: false }, { text: entry.duties, bold: false, fontSize: 10 }];

    //     let qe = JSON.parse(JSON.stringify(experience_entry));
    //     body = [...body, qe] // this is part of dd
    //   });
    // }
    // return body;
    return body;
  }



  let date = `${payment_confirmation.updated_at}`


  let feesPaidDtTime = DateTime.fromISO(date).setZone('Asia/Calcutta').toFormat(
    "dd-MM-yyyy tt"
  );
  console.log('time', feesPaidDtTime)

  const getpaymentreceipt = {

    table: {
      body: [
        ['Name', `${application.personalInfo.name}`],
        ['Payment', `${payment_confirmation.amount}`],
        ['OrderId', `${payment_confirmation.razorpay_order_id}`],
        ['PaymentId', `${payment_confirmation.razorpay_payment_id}`],
        ['Date/Time', `${feesPaidDtTime} `],
      ]

    },

    margin: [150, 20, 0, 0]

  }


  // set permanent address address:
  let correspondenceAddress = "";
  if (application.addressOutsideIndia == 'No') {
    correspondenceAddress = `${application.correspondenceAddress.addressLine1}, ${application.correspondenceAddress.addressLine2}, ${application.correspondenceAddress.state}, ${application.correspondenceAddress.district}, ${application.correspondenceAddress.pin}`;
  } else {
    correspondenceAddress = `${application.correspondenceAddress.outOfIndia.addressLine}, ${application.correspondenceAddress.outOfIndia.state}, ${application.correspondenceAddress.outOfIndia.country}, ${application.correspondenceAddress.outOfIndia.zip}`;
  }

  // console.log('correspondenceAddress--: ', correspondenceAddress);
  dd.content[2].columns[1].table.body[1][0].columns[1].table.body[1][0].text = JSON.parse(JSON.stringify(correspondenceAddress));

  let permanentAddress = "";
  if (application.permanentIsCorrespondence) {
    permanentAddress = correspondenceAddress;
  } else {
    permanentAddress = `${application.permanentAddress.addressLine1}, ${application.permanentAddress.addressLine2}, ${application.permanentAddress.state}, ${application.permanentAddress.district}, ${application.permanentAddress.pin}`;
  }

  // set correspondence address address:
  dd.content[2].columns[1].table.body[1][0].columns[0].table.body[1][0].text = JSON.parse(JSON.stringify(permanentAddress));;
  // console.log('permanentAddress:--', permanentAddress)
  // dd.content[2].table.body = getpermantAddressFormatted();
  dd.content[5].table = {
    widths: [90, 90, 90, 80, 60, 60],
    body: getEssentialQualificationsFormatted(),
  };
  // dd.content[5].layout = 'lightHorizontalLines';
  dd.content[5].layout = {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
    }
  }

  dd.content[8].table =
  {
    widths: [90, 90, 90, 80, 60, 60],
    body: getOtherQualificationsFormatted()
  }
  dd.content[8].layout = {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
    }
  }
  //   dd.content[8].pageBreak = 'after';
  // dd.content[11].table.body = getExperienceFormatted();
  dd.content[11].table = {
    widths: [90, 90, 90, 80, 60, 60],
    body: getExperienceFormatted()
  }
  dd.content[11].layout = {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
    }
  }


  // let [title, empty] = getAchievementFormatted();
  // let one = dd.content.filter((element,i) => {
  //   // console.log('i', i)
  //   return i < 14
  // });
  // one = [...one, title, empty];
  // let two = dd.content.filter((e,i)=> i> 14);
  //   const layout = {
  //     hLineWidth: function (i, node) {
  //       return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
  //     },
  //     vLineWidth: function (i, node) {
  //       return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
  //     }
  //   }

  // dd.content[14].layout = {...layout}

  // getReferenceFormatted();

  // console.log(JSON.stringify(dd.content[2],null,2));
  // dd.content[5].table.body = getEssentialQualificationsFormatted();
  //   dd.content[12] = line,
  dd.content[11].pageBreak = 'after';


  //   // dd.content[24]= line,
  //   dd.content[14] = {
  //     canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
  //   },

  //   dd.content[17] = {
  //     canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
  //   },
  dd.content[13] = declare
  dd.content[14] = Declaration

  let name = {
    alignment: 'right', fontSize: 12, margin: [0, 100, 0, 0],
    text: application.personalInfo.name
  }

  let paymentname = {
    alignment: 'right', fontSize: 12, margin: [0, 30, 200, 0], bold: true,
    text: 'Payment Receipt'

  }

  dd.content[20] = name;
  // },
  dd.content[21] = {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }],
    margin: [0, 10, 0, 0]
  },
    dd.content[22] = paymentname,
    dd.content[23] =
    getpaymentreceipt;

  let document = `report/downloads/cmetsa3pdf-${uniqid()}.pdf`
  // let document = 'document.pdf'
  let pdfDoc = printer.createPdfKitDocument(dd, options);
  pdfDoc.pipe(fs.createWriteStream(document));
  pdfDoc.end();
  console.log("finalprint ready")
  return document;
}

