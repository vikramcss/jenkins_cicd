
var fs = require('fs');
var PdfPrinter = require('pdfmake');
let { DateTime } = require('luxon')
const uniqid = require('uniqid')

exports.finalprint = ({ application }) => {

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
      let fromMonth = e.experienceFrom.split('-')[0];
      let fromYear = e.experienceFrom.split('-')[1];

      let toMonth = e.experienceTo.split('-')[0];
      let toYear = e.experienceTo.split('-')[1];

      let fromDt = DateTime.fromObject({ month: Number(fromMonth), year: Number(fromYear) });
      let toDt = DateTime.fromObject({ month: Number(toMonth), year: Number(toYear) });

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
  const getTotalAchievements = () => {
    let publishedPapers = 0;
    let patent = 0;
    let project = 0;
    let technologyTransferred = 0;
    let technologyDeveloped = 0;
    let award = 0;
    let bookChapter = 0;
    let other = 0;
    let finalString = '';
    let afinalString = [];
    try {

      if (application.achievements) {
        if (application.achievements.publishedPapers && application.achievements.publishedPapers.length > 0) {
          publishedPapers = application.achievements.publishedPapers.length;
          if (publishedPapers) {
            afinalString = [...afinalString, { text: publishedPapers, fontSize: 11 }, { text: ' Published Papers', fontSize: 10 }]
          }
        }
        if (application.achievements.patent && application.achievements.patent.length > 0) {
          patent = application.achievements.patent.length;
          if (afinalString.length) {
            afinalString = [...afinalString, { text: ', ', fontSize: 11 }]
          }
          if (patent) {
            afinalString = [...afinalString, { text: patent, fontSize: 11 }, { text: ' Patents', fontSize: 10 }]
          }
        }

        if (application.achievements.project && application.achievements.project.length > 0) {
          project = application.achievements.project.length;
          if (afinalString.length) {
            afinalString = [...afinalString, { text: ', ', fontSize: 10 }]
          }
          if (project) {
            afinalString = [...afinalString, { text: project, fontSize: 11 }, { text: ' Projects', fontSize: 10 }]
          }
        }
      }
      if (application.achievements.technologyTransferred && application.achievements.technologyTransferred.length > 0) {
        technologyTransferred = application.achievements.technologyTransferred.length;
        if (afinalString.length) {
          afinalString = [...afinalString, { text: ', ', fontSize: 10 }]
        }
        if (technologyTransferred) {
          afinalString = [...afinalString, { text: technologyTransferred, fontSize: 11 },
          { text: ' Techonology Transferred', fontSize: 10 }]
        }
      }
      if (application.achievements.technologyDeveloped && application.achievements.technologyDeveloped.length > 0) {
        technologyDeveloped = application.achievements.technologyDeveloped.length;
        if (afinalString.length) {
          afinalString = [...afinalString, { text: ', ', fontSize: 10 }]
        }
        if (technologyDeveloped) {
          afinalString = [...afinalString, { text: technologyDeveloped, fontSize: 11 },
          { text: ' Techonology Developed', fontSize: 10 }]
        }
      }
      if (application.achievements.award && application.achievements.award.length > 0) {
        award = application.achievements.award.length;
        if (afinalString.length) {
          afinalString = [...afinalString, { text: ', ', fontSize: 10 }]
        }
        if (award) {
          afinalString = [...afinalString, { text: award, fontSize: 11 },
          { text: ' awards', fontSize: 10 }]
        }
      }
      if (application.achievements.bookChapter && application.achievements.bookChapter.length > 0) {
        bookChapter = application.achievements.bookChapter.length;
        if (afinalString.length) {
          afinalString = [...afinalString, { text: ', ', fontSize: 10 }]
        }
        if (bookChapter) {
          afinalString = [...afinalString, { text: bookChapter, fontSize: 11 }, { text: ' Book Chapters', fontSize: 10 }]
        }
      }
      if (application.achievements.other && application.achievements.other.length > 0) {
        other = application.achievements.other.length;
        if (afinalString.length) {
          afinalString = [...afinalString, { text: ', ', fontSize: 10 }]
        }
        if (other) {
          afinalString = [...afinalString, { text: other, fontSize: 11 }, { text: ' Others', fontSize: 10 }]
        }
      }
      return afinalString;
    }
    catch (e) {
      return afinalString = [{ text: '' }]
    }
  }

  
  var fonts = {
    Roboto: {
      normal: 'report/fonts/Roboto-Regular.ttf',
      bold: 'report/fonts/Roboto-Medium.ttf',
      italics: 'report/fonts/Roboto-Italic.ttf',
      bolditalics: 'report/fonts/Roboto-MediumItalic.ttf'
    }
  };
  var printer = new PdfPrinter(fonts);
  let header =
    [
      {
        image: 'report/cmet.jpeg',
        alignment: 'top',
        width: 80,
        height: 30,
        margin: [200, -10, 0, -10]
      },
      {
        fontSize: 14, bold: true,
        alignment: 'top',
        text: 'C-MET Online Application Form ',
        style: 'header', margin: [150, 13, 0, 0]
      },
      {
        fontSize: 12, bold: true,
        alignment: 'center',
        text: 'Post Of Technical Consultants/Research Scientists 2022',
        margin: [0, 0, 0, 30]
      },

      {
        alignment: 'left',
        text: [{ text: application.personalInfo.name.toUpperCase() + ", ", fontSize: 16 }, { text: getEssentialQualificationTitle(), fontSize: 10 }],
        margin: [0, 0, 0, 0]
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
      {
        fontSize: 9, bold: false,
        alignment: 'left',
        text: `${application.personalInfo.category}, ${application.personalInfo.gender}, ${application.personalInfo.dob}, ${application.personalInfo.email}, ${application.personalInfo.mobile}, ${application.personalInfo.religion}, ${application.personalInfo.nationality} ${application.personalInfo.pwd == 'No' ? '' : ', Differently abled: ' + application.personalInfo.PWDType}`,
        margin: [0, 5, 0, 0],

      },
      {
        fontSize: 9, bold: false,
        alignment: 'left',
        text: 'Father Name:' + `${application.personalInfo.fathersName}`,
        margin: [0, 5, 0, 0]
      },

    ];

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

                  {
                    margin: [-10, 0, 0, 0],
                    table: {
                      body: [
                        [{ border: [false, false, false, false], bold: false, margin: [-10, 0, 0, 10], fontSize: 8, text: 'Achievements:' }],
                        [{ border: [false, false, false, false], bold: false, margin: [-10, -7, 0, 0], fontSize: 11, text: getTotalAchievements() }]
                      ]
                    }
                  },
                ]
              },

            ]

          ]
        },

      },

      {
        margin: [0, -20, 0, 0],
        table: {
          headerRows: 1,
          body: [
            [{
              image: `report/downloads/${application.uploads.photo}`,
              width: 150,
              height: 160,



            },],
            [{
              image: `report/downloads/${application.uploads.sign}`,
              width: 150,
              height: 50,
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

  let achieve = {
    widhth: 80,
    bold: true, fontSize: 14,
    text: 'Achievement:  \n\n',
    margin: [0, 10, 0, 0]
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
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
      },
      achieve,


    ] //content end

  } // dd end

  var options = {

  }
  var options = { format: 'A4', header: { "height": "5mm" }, footer: { "height": "5mm" }, border: { top: '30px', bottom: '30px', left: '10px' } }
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
      let marksCGPAdateOfAward;
      let percentage = '-';

      if (entry.qualification != 'Ph.d') {
        subject = entry.mtechME.subject
        university = entry.mtechME.university
        yearOfPassing = entry.mtechME.yearOfPassing
        marksCGPAdateOfAward = entry.mtechME.marksType == 'Percentage' ? entry.mtechME.percentage.marks : entry.mtechME.cgpa.gpa;
        percentage = entry.mtechME.marksType == 'Percentage' ? entry.mtechME.percentage.percentage : '-';
      } else {
        subject = entry.phD.subject
        university = entry.phD.university
        yearOfPassing = entry.phD.yearOfPassing
        marksCGPAdateOfAward = entry.phD.dateOfAward;
      }
      qe[0].text = entry.qualification;
      qe[1].text = subject;
      qe[2].text = university;
      qe[3].text = yearOfPassing;
      qe[4].text = marksCGPAdateOfAward;
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
    let experience_entry = [
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 0]
      },
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 0]
      },
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 10]
      },
    ];

    if (application.experiences && application.experiences.length) {

      application.experiences.forEach(entry => {
        experience_entry[0].text = [{ text: `${entry.postHeld}, `, fontSize: 12, bold: false, margin: [0, 0, 40, 0] },
        { bold: false, text: entry.nameOfOrganization, fontSize: 10 }
        ];
        experience_entry[1].text = [
          { text: 'Duration: ', fontSize: 8, bold: false },
          { text: `from ${entry.experienceFrom} to:${entry.experienceTo}`, bold: false, fontSize: 10, margin: [30, 0, 30, 0] },
          { text: ' Salary: ', fontSize: 8, bold: false, },
          { text: `Rs. ${entry.salary}/mo`, bold: false, fontSize: 10 },
        ];
        experience_entry[2].text = [{ text: 'Duties: ', fontSize: 8, bold: false }, { text: entry.duties, bold: false, fontSize: 10 }];

        let qe = JSON.parse(JSON.stringify(experience_entry));
        body = [...body, qe] // this is part of dd
      });
    }
    // return body;
    return body;
  }


  const getAchievementFormatted = () => {
    let title = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'Published Papers ',
      margin: [0, 10, 0, 10]
    }
    let experience_entry = [
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 0]
      },
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 0]
      },
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 0]
      },
      {
        alignment: 'top',
        text: '',
        margin: [0, 0, 0, 10]
      },
    ];

    let body = [];
    let publishedPaperTitle = { ...title };

    application.achievements.publishedPapers.forEach(pp => {
      experience_entry[0].text = [
        { text: `Title of Paper: `, fontSize: 8, bold: false },
        { text: pp.title, fontSize: 12, bold: false },
      ];
      experience_entry[1].text = [
        { text: `Journal: `, fontSize: 8, bold: false },
        { text: pp.nameOfJournal, fontSize: 10, bold: false }
      ];
      experience_entry[2].text = [
        { text: `Authors: `, fontSize: 8, bold: false },
        { text: pp.author, fontSize: 10, bold: false, },
      ];
      experience_entry[3].text = [
        { text: `DOI: `, fontSize: 8, bold: false },
        { text: pp.doi, fontSize: 10, bold: false },
        { text: ` Impact Factor: `, fontSize: 8, bold: false },
        { text: pp.impactFactor, fontSize: 10, bold: false },
        { text: ` Year: `, fontSize: 8, bold: false },
        { text: pp.year, fontSize: 10, bold: false },
        { text: ` Pages: `, fontSize: 8, bold: false },
        { text: pp.pages, fontSize: 10, bold: false }
      ];

      let qe = JSON.parse(JSON.stringify(experience_entry));
      body = [...body, qe] // this is part of dd
    });
    return [publishedPaperTitle, JSON.parse(JSON.stringify(body))];
  }


  const getpatentformat = () => {
    let patenttitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'Patent',
      margin: [0, 10, 0, 10]
    }
    let patent = {
      fontSize: 10,
      table: {
        widths: [90, 90, 90, 80, 60, 60, 60],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qe = JSON.parse(JSON.stringify(qualificationEntry));

    qe[0].text = 'Patent Status', qe[0].alignment = 'center', qe[0].fontSize = '10', qe[0].bold = 'true',
      qe[1].text = 'Title', qe[1].alignment = 'center', qe[1].fontSize = '10', qe[1].bold = 'true',
      qe[2].text = 'Author', qe[2].alignment = 'center', qe[2].fontSize = '10', qe[2].bold = 'true',
      qe[3].text = 'Patent Type', qe[3].alignment = 'center', qe[3].fontSize = '10', qe[3].bold = 'true',
      qe[4].text = 'Year Of Submission', qe[4].alignment = 'center', qe[4].fontSize = '10', qe[4].bold = 'true',
      qe[5].text = 'Patent Number', qe[5].alignment = 'center', qe[5].fontSize = '10', qe[5].bold = 'true',


      patent.table.body.push(qe);
    application.achievements.patent.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(qualificationEntry));

      qa[0].text = pp.patentStatus;
      qa[1].text = pp.title;
      qa[2].text = pp.author;
      qa[3].text = pp.patentType;
      qa[4].text = pp.yearOfSubmission;
      qa[5].text = pp.patentNumber;

      patent.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [patenttitle, JSON.parse(JSON.stringify(patent))];

  }





  const getprojectformat = () => {
    let projecttitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'Project',
      margin: [0, 10, 0, 10]
    }
    let project = {
      fontSize: 10,
      table: {
        widths: [70, 70, 70, 70, 60, 60, 60],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qe = JSON.parse(JSON.stringify(sevenEntry));

    qe[0].text = 'Title', qe[0].alignment = 'center', qe[0].fontSize = '10', qe[0].bold = 'true',
      qe[1].text = 'Principal Investigator', qe[1].alignment = 'center', qe[1].fontSize = '10', qe[1].bold = 'true',
      qe[2].text = 'Co-Principal Investigator', qe[2].alignment = 'center', qe[2].fontSize = '10', qe[2].bold = 'true',
      qe[3].text = 'Funding Agency', qe[3].alignment = 'center', qe[3].fontSize = '10', qe[3].bold = 'true',
      qe[4].text = ' From', qe[4].alignment = 'center', qe[4].fontSize = '10', qe[4].bold = 'true',
      qe[5].text = ' To', qe[5].alignment = 'center', qe[5].fontSize = '10', qe[5].bold = 'true',
      qe[6].text = 'project Outlay', qe[6].alignment = 'center', qe[6].fontSize = '10', qe[6].bold = 'true',


      project.table.body.push(qe);
    application.achievements.project.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(sevenEntry));

      qa[0].text = pp.title;
      qa[1].text = pp.principalInvestigator;
      qa[2].text = pp.copi;
      qa[3].text = pp.fundingAgency;
      qa[4].text = pp.projectDurationFrom;
      qa[5].text = pp.projectDurationTo;
      qa[6].text = pp.projectOutlay;

      project.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [projecttitle, JSON.parse(JSON.stringify(project))];

  }


  const gettechnologytransferformat = () => {
    let technologytitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'TechnologyTransferred',
      margin: [0, 10, 0, 10]
    }
    let technologyTransferr = {
      fontSize: 10,
      table: {
        widths: [70, 70, 70, 70, 60, 60, 60],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qe = JSON.parse(JSON.stringify(sevenEntry));

    qe[0].text = 'Name of Technology', qe[0].alignment = 'center', qe[0].fontSize = '10', qe[0].bold = 'true',
      qe[1].text = 'Project Name', qe[1].alignment = 'center', qe[1].fontSize = '10', qe[1].bold = 'true',
      qe[2].text = 'Investigator Name', qe[2].alignment = 'center', qe[2].fontSize = '10', qe[2].bold = 'true',
      qe[3].text = 'Transferred To Organzation', qe[3].alignment = 'center', qe[3].fontSize = '10', qe[3].bold = 'true',
      qe[4].text = 'Transferred Year', qe[4].alignment = 'center', qe[4].fontSize = '10', qe[4].bold = 'true',
      qe[5].text = 'TRL', qe[5].alignment = 'center', qe[5].fontSize = '10', qe[5].bold = 'true',
      qe[6].text = 'cost Of Technology', qe[6].alignment = 'center', qe[6].fontSize = '10', qe[6].bold = 'true',


      technologyTransferr.table.body.push(qe);
    application.achievements.technologyTransferred.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(sevenEntry));

      qa[0].text = pp.nameofTechnology;
      qa[1].text = pp.projectName;
      qa[2].text = pp.investigatorName;
      qa[3].text = pp.transferredToOrg;
      qa[4].text = pp.transferredYear;
      qa[5].text = pp.trl;
      qa[6].text = pp.costOfTechnology;

      technologyTransferr.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [technologytitle, JSON.parse(JSON.stringify(technologyTransferr))];

  }


  const gettechnologyDevelepedformat = () => {
    let technologydevelopedtitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'TechnologyDeveloped',
      margin: [0, 10, 0, 10]
    }
    let technologydelevedTransferr = {
      fontSize: 10,
      table: {
        widths: [165, 165, 165],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qe = JSON.parse(JSON.stringify(achievementsEntry));

    qe[0].text = 'Name of Technology name', qe[0].alignment = 'center', qe[0].fontSize = '10', qe[0].bold = 'true',
      qe[1].text = 'patent Published', qe[1].alignment = 'center', qe[1].fontSize = '10', qe[1].bold = 'true',
      qe[2].text = 'TRL', qe[2].alignment = 'center', qe[2].fontSize = '10', qe[2].bold = 'true',
      // qe[3].text ='transferredToOrg',
      // qe[4].text ='transferredYear',
      // qe[5].text ='trl',


      technologydelevedTransferr.table.body.push(qe);
    application.achievements.technologyDeveloped.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(achievementsEntry));

      qa[0].text = pp.nameofTechnologyDeveloped;
      qa[1].text = pp.patentPublished;
      qa[2].text = pp.trl;
      //  qa[3].text='';
      //  qa[4].text='';
      //  qa[5].text='';

      technologydelevedTransferr.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [technologydevelopedtitle, JSON.parse(JSON.stringify(technologydelevedTransferr))];

  }


  const getAwardsformat = () => {
    let Awardstitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'Awards',
      margin: [0, 10, 0, 10]
    }
    let Awards = {
      fontSize: 10,
      table: {
        widths: [170, 160, 160],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qe = JSON.parse(JSON.stringify(achievementsEntry));

    qe[0].text = 'Name of Award', qe[0].alignment = 'center', qe[0].fontSize = '10', qe[0].bold = 'true',
      qe[1].text = 'Sponsoring Agency', qe[1].alignment = 'center', qe[1].fontSize = '10', qe[1].bold = 'true',
      qe[2].text = 'Award Year', qe[2].alignment = 'center', qe[2].fontSize = '10', qe[2].bold = 'true',
      // qe[3].text ='transferredToOrg',
      // qe[4].text ='transferredYear',
      // qe[5].text ='trl',


      Awards.table.body.push(qe);
    application.achievements.award.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(achievementsEntry));

      qa[0].text = pp.nameofAward;
      qa[1].text = pp.sponsoringAgency;
      qa[2].text = pp.awardYear;
      //  qa[3].text='';
      //  qa[4].text='';
      //  qa[5].text='';

      Awards.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [Awardstitle, JSON.parse(JSON.stringify(Awards))];

  }

  const getBookchapterformat = () => {
    let Booktitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'BookChapter',
      margin: [0, 10, 0, 10]
    }
    let Bookchapter = {
      fontSize: 10,
      table: {
        widths: [70, 70, 70, 70, 60, 60, 60],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qe = JSON.parse(JSON.stringify(sevenEntry));

    qe[0].text = 'Book Title', qe[0].alignment = 'center', qe[0].fontSize = '10', qe[0].bold = 'true',
      qe[1].text = 'Book Author', qe[1].alignment = 'center', qe[1].fontSize = '10', qe[1].bold = 'true',
      qe[2].text = 'Name Of Book', qe[2].alignment = 'center', qe[2].fontSize = '10', qe[2].bold = 'true',
      qe[3].text = 'Year', qe[3].alignment = 'center', qe[3].fontSize = '10', qe[3].bold = 'true',
      qe[4].text = 'Pages', qe[4].alignment = 'center', qe[4].fontSize = '10', qe[4].bold = 'true',
      qe[5].text = 'Publishing Agency', qe[5].alignment = 'center', qe[5].fontSize = '10', qe[5].bold = 'true',
      qe[6].text = 'DOI', qe[6].alignment = 'center', qe[6].fontSize = '10', qe[6].bold = 'true',


      Bookchapter.table.body.push(qe);
    application.achievements.bookChapter.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(sevenEntry));

      qa[0].text = pp.bookTitle;
      qa[1].text = pp.bookAuthor;
      qa[2].text = pp.nameOfBook;
      qa[3].text = pp.year;
      qa[4].text = pp.pages;
      qa[5].text = pp.publishingAgency;
      qa[6].text = pp.doi;
      Bookchapter.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [Booktitle, JSON.parse(JSON.stringify(Bookchapter))];

  }


  const getOtherformat = () => {
    let Othertitle = {
      widhth: 80,
      bold: true, fontSize: 12,
      text: 'Other',
      margin: [0, 10, 0, 10]
    }
    let Other = {
      fontSize: 10,
      table: {
        widths: [500],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };




    application.achievements.other.forEach(pp => {
      const qa = JSON.parse(JSON.stringify(otherEntry));

      qa[0].text = pp.text;



      Other.table.body.push(qa);

    });

    // patentTitle= {...title}
    return [Othertitle, JSON.parse(JSON.stringify(Other))];

  }




  const getreferncedFormatted = () => {
    let title = {
      bold: true, fontSize: 14,
      text: 'Reference:',
      margin: [0, 10, 0, 10]
    }
    let refernce = {
      fontSize: 10,
      table: {
        widths: [90, 90, 90, 80, 60, 60, 60],
        body: [

        ]
      },
      margin: [0, 0, 0, 40]
    };

    const qa = JSON.parse(JSON.stringify(qualificationEntry));

    qa[0].text = 'Reference Name', qa[0].alignment = 'center', qa[0].fontSize = '10', qa[0].bold = 'true'
    qa[1].text = 'Reference Occuption', qa[1].alignment = 'center', qa[1].fontSize = '10', qa[1].bold = 'true'
    qa[2].text = 'Reference Address', qa[2].alignment = 'center', qa[2].fontSize = '10', qa[2].bold = 'true'
    qa[3].text = 'Reference Email', qa[3].alignment = 'center', qa[3].fontSize = '10', qa[3].bold = 'true'
    qa[4].text = 'Reference Mobile', qa[4].alignment = 'center', qa[4].fontSize = '10', qa[4].bold = 'true'
    qa[5].text = 'Reference association', qa[5].alignment = 'center', qa[5].fontSize = '10', qa[5].bold = 'true'

    refernce.table.body.push(qa)
    let body = [];
    application.references.forEach(entry => {
      const qe = JSON.parse(JSON.stringify(qualificationEntry));

      qe[0].text = entry.refName;
      qe[1].text = entry.refOccupation
      qe[2].text = entry.refAddress
      qe[3].text = entry.refEmail
      qe[4].text = entry.refMobile;
      qe[5].text = entry.refAssociation;

      refernce.table.body.push(qe)// this is part of dd
    });
    return [title, refernce];
  }




  // set permanent address address:
  let correspondenceAddress = "";
  if (application.addressOutsideIndia == 'No') {
    correspondenceAddress = `${application.correspondenceAddress.addressLine1}, ${application.correspondenceAddress.addressLine2}, ${application.correspondenceAddress.state}, ${application.correspondenceAddress.district}, ${application.correspondenceAddress.pin}`;
  } else {
    correspondenceAddress = `${application.correspondenceAddress.addressLine}, ${application.correspondenceAddress.state}, ${application.correspondenceAddress.country}, ${application.correspondenceAddress.zip}`;
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

  dd.content[8].table.body = getOtherQualificationsFormatted();
  dd.content[8].layout = {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
    }
  }
  dd.content[8].pageBreak = 'after';
  // dd.content[11].table.body = getExperienceFormatted();
  dd.content[11] = getExperienceFormatted();

  // let [title, empty] = getAchievementFormatted();
  // let one = dd.content.filter((element,i) => {
  //   // console.log('i', i)
  //   return i < 14
  // });
  // one = [...one, title, empty];
  // let two = dd.content.filter((e,i)=> i> 14);
  const layout = {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
    }
  }

  // dd.content[14].layout = {...layout}
  if (application.achievements && application.achievements.publishedPapers && application.achievements.publishedPapers.length > 0) {
    dd.content[14] = getAchievementFormatted();
    dd.content[14][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }
  if (application.achievements && application.achievements.patent && application.achievements.patent.length > 0) {
    dd.content[15] = getpatentformat();
    dd.content[15][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  }
  if (application.achievements && application.achievements.project && application.achievements.project.length > 0) {
    dd.content[16] = getprojectformat();
    dd.content[16][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }
  if (application.achievements && application.achievements.technologyTransferred && application.achievements.technologyTransferred.length > 0) {
    dd.content[17] = gettechnologytransferformat();
    dd.content[17][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }
  if (application.achievements &&   application.achievements.technologyDeveloped && application.achievements.technologyDeveloped.length > 0) {
    dd.content[18] = gettechnologyDevelepedformat();
    dd.content[18][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }

  if (application.achievements && application.achievements.award && application.achievements.award.length > 0) {
    dd.content[19] = getAwardsformat();
    dd.content[19][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }
  if (application.achievements && application.achievements.bookChapter && application.achievements.bookChapter.length > 0) {
    dd.content[20] = getBookchapterformat();
    dd.content[20][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }
  if (application.achievements && application.achievements.other && application.achievements.other.length > 0) {
    dd.content[21] = getOtherformat();
    dd.content[21][1].layout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
      }
    }
  } else {
  }
  // getReferenceFormatted();

  // console.log(JSON.stringify(dd.content[2],null,2));
  // dd.content[5].table.body = getEssentialQualificationsFormatted();
  dd.content[22] = line,
    dd.content[23] = getreferncedFormatted();
  dd.content[23][1].layout = {
    hLineWidth: function (i, node) {
      return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
    },
    vLineWidth: function (i, node) {
      return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
    }
  }
  // dd.content[24]= line,
  dd.content[24] = {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
  },
    dd.content[25] = Additional
  dd.content[26] = additionalInformation
  dd.content[27] = {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1, }]
  },
    dd.content[28] = declare
  dd.content[29] = Declaration

  let name = {
    alignment: 'right', fontSize: 12, margin: [0, 100, 0, 0],
    text: application.personalInfo.name
  }

  dd.content[30] = name;
  let document = `report/downloads/final-print-${uniqid()}.pdf`
  // let document = 'document.pdf'
  let pdfDoc = printer.createPdfKitDocument(dd, options);
  pdfDoc.pipe(fs.createWriteStream(document));
  pdfDoc.end();
  return document;
}
