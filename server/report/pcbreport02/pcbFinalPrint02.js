var fs = require("fs");
var PdfPrinter = require("pdfmake");
let { DateTime } = require("luxon");
const uniqid = require("uniqid");
const { resolve } = require("path");
const path = require("path");
let confirmation_client;
let confirmation_server;

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

exports.finalprint = ({ application, postId, postRecord, postName }) => {
  console.log("post id is .... pfd", postName);
  let aPromise = new Promise((resolve, reject) => {
    console.log("kcpFinalPrint");
    console.log("postRecord", postRecord);
    const getEssentialQualificationTitle = () => {
      let degrees = "";
      let adegrees = [];
      let fontSize = 10;
      application.essentialQualifications.forEach((q) => {
        degrees += degrees.length > 0 ? ", " : "";
        if (degrees.length) {
          adegrees = [...adegrees, { text: ",", fontSize }];
        }
        degrees += q.qualification;
        adegrees = [...adegrees, { text: q.qualification, fontSize }];
      });
      return adegrees;
    };

    const getScribe = () => {
      if (postRecord == "sweeper") {
        return application[postRecord].scribe;
      }
      return null;
    };

    var options = {
      format: "A4",
      header: { height: "5mm" },
      footer: { height: "5mm" },
      border: { top: "30px", bottom: "30px", left: "10px" },
    };
    var fonts = {
      Roboto: {
        normal: "report/fonts/Roboto-Regular.ttf",
        bold: "report/fonts/Roboto-Medium.ttf",
        italics: "report/fonts/Roboto-Italic.ttf",
        bolditalics: "report/fonts/Roboto-MediumItalic.ttf",
      },
    };

    var printer = new PdfPrinter(fonts);
    let header = [
      {
        // image: 'report/PCBLogo.jpeg',
        image: path.resolve(__dirname, "PCBlogo.png"),

        alignment: "top",
        width: 80,
        height: 80,
        margin: [200, -10, 0, -10],
      },
      {
        fontSize: 16,
        bold: true,
        alignment: "top",
        text: "Pune Cantonment Board Online Application Form ",
        style: "header",
        margin: [80, 13, 0, 0],
      },
      {
        fontSize: 10,
        bold: true,
        alignment: "center",
        text: `Advertisement No : Recruitment/P-168 Dated(Employment News) : 04th March 2023`,
        margin: [15, 0, 0, 05],
      },
      {
        fontSize: 10,
        bold: true,
        alignment: "center",
        text: `Post Of ${postName} `,
        margin: [0, 0, 0, 30],
      },

      {
        fontSize: 16,
        bold: true,
        alignment: "left",
        text: " Personal Information",
        margin: [0, 0, 0, 0],
      },
      {
        bold: true,
        text: `AppId:${application[postRecord].appid}`,
        margin: [400, -15, 0, 10],
      },
      // {
      //   fontSize: 12, bold: false,
      //   alignment: 'left',
      //  text: getEssentialQualificationTitle(),
      //   margin: [0, 0, 0, 5]
      // },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 595 - 2 * 30,
            y2: 0,
            lineWidth: 0.5,
          },
        ],
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
        text: [
          { text: `Full Name:\t`, fontSize: 8 },
          {
            text: `${application.personalInfo.name}`,
            fontSize: 10,
            bold: true,
          },
        ],
        margin: [0, 10, 0, 5],
      },
      {
        text: [
          { text: `Father's/Husband's Name:\t`, fontSize: 8 },
          {
            text: `${application.personalInfo.fathersName}`,
            fontSize: 10,
            bold: true,
          },
        ],
        margin: [0, 0, 0, -5],
      },

      {
        columns: [
          [
            {
              text: [
                { text: `Date of Birth:\t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.dob}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [0, 0, 0, 5],
            },

            {
              text: [
                { text: `Mobile No:\t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.mobile}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [0, 0, 0, 5],
            },
            {
              text: [
                { text: `Email:\t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.email}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [0, 0, 0, 5],
            },
            {
              text: [
                { text: `Gender: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.gender}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [0, 0, 0, 5],
            },
            {
              text: [
                { text: `Category: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.category}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [0, 0, 0, 5],
            },
            {
              text: [
                { text: `Marital Status: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.Married_Status}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [0, 0, 0, 5],
            },
            // {
            //     text: [
            //         { text: `Scribe: \t`, fontSize: 8 },
            //         { text: getScribe() ? getScribe() : "No", fontSize: 10, bold: true }
            //     ], margin: [0, 0, 0, 5]
            // }
          ],

          [
            // {
            //   text: [
            //     { text: `Religion: \t`, fontSize: 8 },
            //     {
            //       text: `${application.personalInfo.religion}`,
            //       fontSize: 10,
            //       bold: true,
            //     },
            //   ],
            //   margin: [-60, 0, 0, 5],
            // },

            {
              text: [
                { text: `Nationality: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.nationality}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [-40, 0, 0, 5],
            },
            {
              text: [
                { text: `PwBD: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.pwd} `,
                  fontSize: 10,
                  bold: true,
                },
                {
                  text: `${application[postRecord].scribe
                      ? "Scribe: " + application[postRecord].scribe
                      : ""
                    }`,
                  fontSize: 8,
                },
              ],
              margin: [-40, 0, 0, 5],
            },
            {
              text: [
                { text: `Ex-serviceman: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.exserviceman}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [-40, 0, 0, 5],
            },
            {
              text: [
                { text: `Widowed/Divorced: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.widowOrDivorced}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [-40, 0, 0, 5],
            },
            {
              text: [
                { text: `Pune Cantonment Board Employee: \t`, fontSize: 8 },
                {
                  text: `${application.personalInfo.govemployee}`,
                  fontSize: 10,
                  bold: true,
                },
              ],
              margin: [-40, 0, 0, 5],
            },
          ],
        ],

        margin: [0, 10, 0, 0],
      },

      {
        text: [
          {
            text: `Whether related to any Member/Employee of Pune Cantonment Board: \t`,
            fontSize: 8,
          },
          {
            text: `${application.personalInfo.KCBrelatedEmployee}`,
            fontSize: 10,
            bold: true,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      
      {
        
        text: application.personalInfo.KCBrelatedEmployee == "Yes" ? `(${application.personalInfo.kcbRelatedName}, ${application.personalInfo.kcbRelatedDesignation})`:"",
        fontSize: 10,
        bold: true,


        margin: [0, -10, 0, 10],
      },
    ];

    let header2 = {
      columns: [
        { width: 10, text: "" },
        {
          width: "auto",
          table: {
            widths: [340],
            heights: [25],

            body: [
              [
                {
                  border: [false, false, false, false],
                  fontSize: 14,
                  bold: true,
                  text: application.personalInfo,
                },
              ],
              [
                {
                  border: [false, false, false, false],
                  fontSize: 10,
                  columns: [
                    {
                      margin: [-20, -50, 0, 5],
                      table: {
                        body: [
                          [
                            {
                              border: [false, false, false, false],
                              bold: false,
                              fontSize: 8,
                              text: "Permanent Address: ",
                            },
                          ],
                          [
                            {
                              border: [false, false, false, false],
                              bold: false,
                              margin: [0, 0, 0, 0],
                              fontSize: 10,
                              text:
                                application.permanentAddress.addressLine1 +
                                ", " +
                                application.permanentAddress.addressLine2 +
                                ", " +
                                application.permanentAddress.state +
                                ", " +
                                application.permanentAddress.district +
                                ", " +
                                application.permanentAddress.pin,
                            },
                          ],
                        ],
                      },
                    },
                  ],
                },
              ],

              [
                {
                  border: [false, false, false, false],
                  fontSize: 10,
                  columns: [
                    {
                      margin: [-20, -5, 0, 0],
                      table: {
                        body: [
                          [
                            {
                              border: [false, false, false, false],
                              bold: false,
                              fontSize: 8,
                              text: "Correspondence Address:",
                            },
                          ],
                          [
                            {
                              border: [false, false, false, false],
                              bold: false,
                              margin: [-2, 0, 0, 0],
                              fontSize: 10,
                              text:
                                application.correspondenceAddress.addressLine1 +
                                ", " +
                                application.correspondenceAddress.addressLine2 +
                                ", " +
                                application.correspondenceAddress.state +
                                ", " +
                                application.correspondenceAddress.district +
                                ", " +
                                application.correspondenceAddress.pin,
                            },
                          ],
                        ],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },

        {
          margin: [30, -160, 0, 0],
          table: {
            headerRows: 1,
            body: [
              [
                {
                  image: `report/downloads/${application.uploads.photo}`,
                  // image: "cmet.jpeg",
                  width: 120,
                  height: 120,
                },
              ],
              [
                {
                  image: `report/downloads/${application.uploads.sign}`,
                  // image: "cmet.jpeg",
                  width: 80,
                  height: 40,
                  alignment: "center",
                },
              ],
            ],
          },
        },
      ],
      margin: [0, 15, 0, 10],
    };

    let qual = {
      widhth: 80,
      fontSize: 14,
      bold: true,
      text: "Essential Qualification:  \n\n",
      margin: [0, 15, 0, 0],
    };

    let displayQualifications = {
      table: {
        widths: [90, 90, 90, 80, 60, 60],
        body: [],
      },
      margin: [0, 10, 0, 20],
    };
    let other = {
      widhth: 80,
      fontSize: 14,
      bold: true,
      text: "Other Qualification:  \n\n",
      margin: [0, 20, 0, 0],
    };

    let other1 = {
      table: {
        widths: [90, 90, 90, 80, 60, 60],
        body: [],
      },
      margin: [0, 0, 0, 20],
    };

    let exper = {
      bold: true,
      fontSize: 14,
      widhth: 80,
      text: "Experience:",
      margin: [0, 20, 0, 10],
    };
    let experience1 = {
      fontSize: 10,
      margin: [0, 0, 0, 20],
      table: {
        widths: [90, 90, 90, 80, 60, 60],
        body: [],
      },
    };
    let declare = {
      bold: true,
      fontSize: 14,
      widhth: 80,
      text: " Declaration:  \n\n",
      margin: [0, 20, 0, 0],
    };

    let Declaration = {
      fontSize: 10,
      text: " I hereby declare that I have carefully read and fully understood all the instructions and details pertaining to the post being applied by me and all statements made and information furnished in this application are true and complete to the best of my knowledge and belief.  I have read the advertisement and I am qualified for this post. I have reviewed all the attachments uploaded and are accurate, readable and clear.",
    };

    let Declaration1 = {
      fontSize: 10,
      text: "I also declare that I have not concealed any material information which may debar my candidature for the post applied for. In the event of suppression or distortion of any fact including category, age or educational qualification, experience etc. made in my application form, I understand that I will be denied any employment in the organization and if already employed on any of the posts in the Institute, my services will be terminated forthwith without notice.",
      margin: [0, 10, 0, 0],
    };
    let Declaration2 = {
      fontSize: 10,
      text: "Payment once done,even for single post,the personal information filled by the candidate will be frozen and will not be editable",
      margin: [0, 10, 0, 0],
    };

    let sevenentry = [{}, {}, {}, {}, {}, {}, {}];

    const getEssentialQualification = () => {
      let title = {
        bold: true,
        fontSize: 14,
        text: "Essential Qualification",
        alignment: "left",
        margin: [0, 10, 0, 10],
      };
      let body = [];
      let totalRows = {
        fontSize: 9,
        table: {
          widths: [70, 80, 95, 100, 60, 60],
          body: [],
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i = 0 || i === node.table.body.length) ? 0.1 : 0.1;
          },
          vLineWidth: function (i, node) {
            return (i = 0 || i === node.table.widths.length) ? 0.1 : 0.1;
          },
        },
      };

      const qa = JSON.parse(JSON.stringify(sixentry));
      (qa[0].text = "Sr.No."),
        (qa[0].alignment = "center"),
        (qa[0].bold = true),
        (qa[1].text = "Qualification"),
        (qa[1].alignment = "center"),
        (qa[1].bold = true),
        (qa[2].text = "Year Of Passing"),
        (qa[2].alignment = "center"),
        (qa[2].bold = true),
        (qa[3].text = "School Name/Board/University"),
        (qa[3].alignment = "center"),
        (qa[3].bold = true),
        (qa[4].text = "Marks/CGPA"),
        (qa[4].alignment = "center"),
        (qa[4].bold = true),
        (qa[5].text = "Percentage(%)"),
        (qa[5].alignment = "center"),
        (qa[5].bold = true),
        totalRows.table.body.push(qa);

      let qualification = application[postRecord].essentialQualifications;
      // if (
      //   qualification.filter(
      //     (q) =>
      //       !(
      //         q.qualification == "Driving License LMV" ||
      //         q.qualification == "Driving License HMV"
      //       )
      //   )
      // ) {
      for (let i in qualification.filter((q) => !(q.qualification == "Driving Licence LMV" || q.qualification == "Driving Licence HMV"))) {
        const q1 = JSON.parse(JSON.stringify(sixentry));
        if (qualification[i].marksType == "CGPA/Grade") {
          (q1[0].text = Number(i) + Number(1)),
            (q1[0].alignment = "center"),
            (q1[1].text = `${qualification[i].qualification}`),
            (q1[1].alignment = "center"),
            (q1[2].text = qualification[i].yearOfPassing),
            (q1[2].alignment = "center"),
            (q1[3].text = `${qualification[i].boardName
                ? qualification[i].boardName
                : qualification[i].schoolName
              } `),
            (q1[3].alignment = "center"),
            (q1[4].text = qualification[i].cgpa),
            (q1[4].alignment = "center"),
            (q1[5].text = `--`),
            (q1[5].alignment = "center");
          totalRows.table.body.push(q1);
        } else {
          (q1[0].text = Number(i) + Number(1)),
            (q1[0].alignment = "center"),
            (q1[1].text = `${qualification[i].qualification}`),
            (q1[1].alignment = "center"),
            (q1[2].text = qualification[i].yearOfPassing),
            (q1[2].alignment = "center"),
            (q1[3].text = `${qualification[i].boardName
                ? qualification[i].boardName
                : qualification[i].schoolName
              } `),
            (q1[3].alignment = "center"),
            (q1[4].text = `${qualification[i].marks} `),
            (q1[4].alignment = "center"),
            (q1[5].text = ` ${qualification[i].percentage}`),
            (q1[5].alignment = "center");
          totalRows.table.body.push(q1);
        }
        // }
      }

      return [title, totalRows];
    };

    const getDriving = () => {
      let title = {
        bold: true,
        fontSize: 14,
        text: "Driving Licence",
        alignment: "left",
        margin: [0, 10, 0, 10],
      };
      let body = [];
      let totalRows = {
        fontSize: 9,
        table: {
          widths: [120, 120, 120, 120],
          body: [],
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i = 0 || i === node.table.body.length) ? 0.1 : 0.1;
          },
          vLineWidth: function (i, node) {
            return (i = 0 || i === node.table.widths.length) ? 0.1 : 0.1;
          },
        },
      };

      let driverQualifications = application[
        postRecord
      ].essentialQualifications.filter(
        (q) =>
          q.qualification == "Driving Licence LMV" ||
          q.qualification == "Driving Licence HMV"
      );
      const qa = JSON.parse(JSON.stringify(fourEntry));
      (qa[0].text = "Sr.No."),
        (qa[0].alignment = "center"),
        (qa[0].bold = true),
        (qa[1].text = "Driving Type"),
        (qa[1].alignment = "center"),
        (qa[1].bold = true),
        (qa[2].text = "Driving Licence Number"),
        (qa[2].alignment = "center"),
        (qa[2].bold = true),
        (qa[3].text = "Valid Till"),
        (qa[3].alignment = "center"),
        (qa[3].bold = true),
        totalRows.table.body.push(qa);

      let qualification = driverQualifications;

      for (let i in qualification) {
        const q1 = JSON.parse(JSON.stringify(fourEntry));
        (q1[0].text = Number(i) + Number(1)),
          (q1[0].alignment = "center"),
          (q1[1].text = `${qualification[i].qualification}`),
          (q1[1].alignment = "center"),
          (q1[2].text = qualification[i].dLNumber),
          (q1[2].alignment = "center"),
          (q1[3].text = qualification[i].validTill),
          (q1[3].alignment = "center"),
          totalRows.table.body.push(q1);
      }

      return [title, totalRows];
    };

    const getExperince = ({ postRecord }) => {
      let title = {
        bold: true,
        fontSize: 14,
        text: "Experience",
        alignment: "left",
        margin: [0, 10, 0, 10],
      };
      let body = [];
      let totalRows = {
        fontSize: 9,
        table: {
          widths: [60, 100, 78, 78, 78, 78],
          body: [],
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i = 0 || i === node.table.body.length) ? 0.1 : 0.1;
          },
          vLineWidth: function (i, node) {
            return (i = 0 || i === node.table.widths.length) ? 0.1 : 0.1;
          },
        },
      };

      const qa = JSON.parse(JSON.stringify(sixentry));
      (qa[0].text = "Sr.No."),
        (qa[0].alignment = "center"),
        (qa[0].bold = true),
        (qa[1].text = "Name Of Organization"),
        (qa[1].alignment = "center"),
        (qa[1].bold = true),
        (qa[2].text = "PostHeld"),
        (qa[2].alignment = "center"),
        (qa[2].bold = true),
        (qa[3].text = "ExperienceFrom"),
        (qa[3].alignment = "center"),
        (qa[3].bold = true),
        (qa[4].text = "ExperienceTo"),
        (qa[4].alignment = "center"),
        (qa[4].bold = true),
        (qa[5].text = "Duties"),
        (qa[5].alignment = "center"),
        (qa[5].bold = true),
        totalRows.table.body.push(qa);

      let qualification = application[postRecord].experiences;
      for (let i in qualification) {
        const q1 = JSON.parse(JSON.stringify(sixentry));

        (q1[0].text = Number(i) + Number(1)),
          (q1[0].alignment = "center"),
          (q1[1].text = `${qualification[i].nameOfOrganization}`),
          (q1[1].alignment = "center"),
          (q1[2].text = qualification[i].postHeld),
          (q1[2].alignment = "center"),
          (q1[3].text = qualification[i].experienceFrom),
          (q1[3].alignment = "center"),
          (q1[4].text = qualification[i].experienceTo),
          (q1[4].alignmnt = "center"),
          (q1[5].text = qualification[i].duties),
          (q1[5].alignment = "center"),
          totalRows.table.body.push(q1);
      }

      return [title, totalRows];
    };

    let sixentry = [{}, {}, {}, {}, {}, {}];
    let fourEntry = [{}, {}, {}, {}];

    const getOtherQualification = () => {
      let title = {
        bold: true,
        fontSize: 14,
        text: "Other Qualification",
        alignment: "left",
        margin: [0, 20, 0, 10],
      };
      let body = [];
      let totalRows = {
        fontSize: 9,
        table: {
          widths: [54, 66, 74, 74, 66, 66, 66],
          body: [],
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i = 0 || i === node.table.body.length) ? 0.1 : 0.1;
          },
          vLineWidth: function (i, node) {
            return (i = 0 || i === node.table.widths.length) ? 0.1 : 0.1;
          },
        },
      };

      const qa = JSON.parse(JSON.stringify(sevenentry));
      (qa[0].text = "Sr.No."),
        (qa[0].alignment = "center"),
        (qa[0].bold = true),
        (qa[1].text = "Qualification"),
        (qa[1].alignment = "center"),
        (qa[1].bold = true),
        (qa[2].text = "University/Board"),
        (qa[2].alignment = "center"),
        (qa[2].bold = true),
        (qa[3].text = "Specialization/Degree"),
        (qa[3].alignment = "center"),
        (qa[3].bold = true),
        (qa[4].text = "Year of Passing/Date Of Award"),
        (qa[4].alignment = "center"),
        (qa[4].bold = true),
        (qa[5].text = "Marks/CGPA/Grade"),
        (qa[5].alignment = "center"),
        (qa[5].bold = true),
        (qa[6].text = "Percentage(%)"),
        (qa[6].alignment = "center"),
        (qa[6].bold = true),
        totalRows.table.body.push(qa);

      let qualification = application[postRecord].otherQualifications;
      for (let i in qualification) {
        if (qualification[i].qualification == "10th") {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          if (qualification[i].marksType == "Percentage") {
            (q1[1].text = qualification[i].qualification),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = "--"),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].marks}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `${qualification[i].percentage}`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          } else {
            (q1[0].text = Number(i) + Number(1)),
              (q1[0].alignment = "center"),
              (q1[1].text = qualification[i].qualification),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = "--"),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].cgpa}`),
              (q1[5].alignment = "center"),
              (q1[6].text = "-"),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          }
        } else if (qualification[i].qualification == "12th") {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          if (qualification[i].marksType == "Percentage") {
            (q1[1].text = qualification[i].qualification),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].twelthSpecialization),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].marks}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `${qualification[i].percentage}`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          } else {
            (q1[0].text = Number(i) + Number(1)),
              (q1[0].alignment = "center"),
              (q1[1].text = qualification[i].qualification),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].twelthSpecialization),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].cgpa}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `-`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          }
        }

        // else if (qualification[i].qualification == "12th") {
        //     const q1 = JSON.parse(JSON.stringify(sixentry));
        //     q1[0].text = Number(i) + Number(1), q1[0].alignment = 'center',
        //         q1[1].text = qualification[i].qualification, q1[1].alignment = 'center',
        //         q1[2].text = qualification[i].university, q1[2].alignment = 'center',
        //         q1[3].text = qualification[i].twelthSpecialization, q1[3].alignment = 'center',
        //         q1[4].text = qualification[i].yearOfPassing, q1[4].alignment = 'center',
        //         q1[5].text = `${qualification[i].marks}-(${qualification[i].percentage}%)`, q1[5].alignment = 'center',
        //         totalRows.table.body.push(q1)
        // }
        else if (qualification[i].qualification == "Diploma") {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          if (qualification[i].marksType == "Percentage") {
            (q1[1].text = qualification[i].qualification),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].marks}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `${qualification[i].percentage}`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          } else {
            (q1[1].text = qualification[i].qualification),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].cgpa}`),
              (q1[5].alignment = "center"),
              (q1[6].text = "-"),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          }
        } else if (qualification[i].qualification == "Graduation") {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          if (qualification[i].marksType == "Percentage") {
            (q1[1].text = `${qualification[i].qualification} - ${qualification[i].degree}`),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].marks}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `${qualification[i].percentage}`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          } else {
            (q1[1].text = `${qualification[i].qualification} - ${qualification[i].degree}`),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].cgpa}`),
              (q1[5].alignment = "center"),
              (q1[6].text = "-"),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          }
        } else if (qualification[i].qualification == "Post Graduation") {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          if (qualification[i].marksType == "Percentage") {
            (q1[1].text = `${qualification[i].qualification} - ${qualification[i].degree}`),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].marks}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `${qualification[i].percentage}`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          } else {
            (q1[1].text = `${qualification[i].qualification} - ${qualification[i].degree}`),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].cgpa}`),
              (q1[5].alignment = "center"),
              (q1[6].text = "-"),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          }
        } else if (qualification[i].qualification == "PhD") {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          (q1[1].text = qualification[i].qualification),
            (q1[1].alignment = "center"),
            (q1[2].text = qualification[i].university),
            (q1[2].alignment = "center"),
            (q1[3].text = qualification[i].subject),
            (q1[3].alignment = "center"),
            (q1[4].text = qualification[i].dateOfAward),
            (q1[4].alignment = "center"),
            (q1[5].text = `--`),
            (q1[5].alignment = "center"),
            (q1[6].text = `--`),
            (q1[6].alignment = "center"),
            totalRows.table.body.push(q1);
        } else {
          const q1 = JSON.parse(JSON.stringify(sevenentry));
          (q1[0].text = Number(i) + Number(1)), (q1[0].alignment = "center");
          if (qualification[i].marksType == "Percentage") {
            (q1[1].text = `${qualification[i].qualification} - ${qualification[i].degree}`),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].marks}`),
              (q1[5].alignment = "center"),
              (q1[6].text = `${qualification[i].percentage}`),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          } else {
            (q1[1].text = `${qualification[i].qualification} - ${qualification[i].degree}`),
              (q1[1].alignment = "center"),
              (q1[2].text = qualification[i].university),
              (q1[2].alignment = "center"),
              (q1[3].text = qualification[i].subject),
              (q1[3].alignment = "center"),
              (q1[4].text = qualification[i].yearOfPassing),
              (q1[4].alignment = "center"),
              (q1[5].text = `${qualification[i].cgpa}`),
              (q1[5].alignment = "center"),
              (q1[6].text = "-"),
              (q1[6].alignment = "center"),
              totalRows.table.body.push(q1);
          }
        }
      }

      // application.essentialQualifications.forEach(entry => {
      //     const qe = JSON.parse(JSON.stringify(qualificationEntry));

      //     let subject;
      //     let university;
      //     let yearOfPassing;
      //     let marksCGPA;
      //     let percentage = '-';

      //     if (entry.marksType != 'CGPA') {

      //         subject = entry.subject
      //         university = entry.university
      //         yearOfPassing = entry.yearOfPassing
      //         marksCGPA = entry.evaluation.percentage.marks;
      //         percentage = entry.evaluation.percentage.percentage;
      //     } else {
      //         subject = entry.subject
      //         university = entry.university
      //         yearOfPassing = entry.yearOfPassing
      //         marksCGPA = entry.evaluation.cgpa.gpa;
      //         percentage = '-';
      //     }

      //     qe[0].text = entry.qualification;
      //     qe[1].text = subject;
      //     qe[2].text = university;
      //     qe[3].text = yearOfPassing;
      //     qe[4].text = marksCGPA;
      //     qe[5].text = percentage;

      //     body = [...body, qe] // this is part of dd
      // });
      return [title, totalRows];
    };

    let dd = {
      footer: {
        columns: [
          {
            text: `Date:${DateTime.now()
              .setZone("Asia/Calcutta")
              .toLocaleString(DateTime.DATE_MED)} ${DateTime.now()
                .setZone("Asia/Calcutta")
                .toLocaleString(DateTime.TIME_SIMPLE)}`,
            alignment: "left",
            margin: [20, 10, 40, 0],
            fontSize: 8,
          },
        ],
      },

      background: function (currentPage, pageSize) {
        //border
        return {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 575,
              h: 820,
              r: 2,
              lineColor: "black",
              text: "date",
            },
          ],

          margin: 10,
        };
      },

      content: [
        header,
        {},
        header2,
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 595 - 2 * 30,
              y2: 0,
              lineWidth: 1,
            },
          ],
        },
        // qualificationEntry,
      ], //content end
    }; // dd end

    var options = {};

    // console.log('output', JSON.stringify(dd.content[0].columns, null, 2))
    let sign = {
      image: `report/downloads/${application.uploads.sign}`,
      // image: "cmet.jpeg",
      width: 80,
      height: 40,
      margin: [0, 100, 0, -90],
      alignment: "right",
    };

    let name = {
      alignment: "right",
      fontSize: 12,
      margin: [0, 100, 10, 0],
      text: application.personalInfo.name,
    };

    let correspondenceAddress = "";
    correspondenceAddress = `${application.correspondenceAddress.addressLine1}, ${application.correspondenceAddress.addressLine2}, ${application.correspondenceAddress.state}, ${application.correspondenceAddress.district}, ${application.correspondenceAddress.pin}`;

    // console.log('correspondenceAddress--: ', correspondenceAddress);
    dd.content[2].columns[1].table.body[2][0].columns[0].table.body[1][0].text =
      JSON.parse(JSON.stringify(correspondenceAddress));

    let permanentAddress = "";
    if (application.permanentIsCorrespondence) {
      permanentAddress = correspondenceAddress;
    } else {
      permanentAddress = `${application.permanentAddress.addressLine1}, ${application.permanentAddress.addressLine2}, ${application.permanentAddress.state}, ${application.permanentAddress.district}, ${application.permanentAddress.pin}`;
    }

    console.log("permanentAddress: ", permanentAddress);
    // set correspondence address address:
    dd.content[2].columns[1].table.body[1][0].columns[0].table.body[1][0].text =
      JSON.parse(JSON.stringify(permanentAddress));
    // dd.content[3] = { text: "", pageBreak: 'after' };
    (dd.content[3] = {
      canvas: [
        { type: "line", x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1 },
      ],
    }),
      (dd.content[4] = getEssentialQualification());
    if (postRecord == "driver") {
      dd.content[5] = getDriving();
    } else {
      dd.content[5] = "";
    }
    dd.content[6] = getOtherQualification();
    dd.content[7] = {
      canvas: [
        { type: "line", x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1 },
      ],
      margin: [0, 10, 0, 0],
    };
    if (postRecord == "pediatrician") {
      dd.content[8] = getExperince({ postRecord: "pediatrician" });
    } else {
      dd.content[8] = "";
    }
    dd.content[9] = declare;
    dd.content[10] = Declaration;
    dd.content[11] = Declaration1;
    dd.content[12] = Declaration2;
    dd.content[13] = sign;
    dd.content[14] = name;
    dd.content[15] = {
      canvas: [
        { type: "line", x1: 0, y1: 0, x2: 595 - 2 * 30, y2: 0, lineWidth: 1 },
      ],
      margin: [0, 10, 0, 0],
    };
    let paymentname = {
      alignment: "right",
      fontSize: 12,
      margin: [0, 30, 200, 0],
      bold: true,
      text: `Payment Receipt for ${postRecord}`,
    };
    let payment_confirmation = application[postRecord].confirmation_client
      ? application[postRecord].confirmation_client
      : application[postRecord].confirmation_server;
    let date = `${payment_confirmation.updated_at}`;

    let feesPaidDtTime = DateTime.fromISO(date)
      .setZone("Asia/Calcutta")
      .toFormat("dd-MM-yyyy tt");
    console.log("time", feesPaidDtTime);
    let feeamount = payment_confirmation.amount;
    feeamount = feeamount / 100;
    console.log("app fee ", feeamount);
    const getpaymentreceipt = {
      table: {
        body: [
          ["AppId", `${application[postRecord].appid}`],
          ["Name", `${application.personalInfo.name}`],
          ["Payment", `${feeamount} Rs`],
          ["OrderId", `${payment_confirmation.razorpay_order_id}`],
          ["PaymentId", `${payment_confirmation.razorpay_payment_id}`],
          ["Date/Time", `${feesPaidDtTime} `],
        ],
      },

      margin: [150, 20, 0, 0],
    };

    dd.content[16] = paymentname;
    dd.content[17] = getpaymentreceipt;

    let document = `report/downloads/pcb01-${application.appid}-${uniqid()}.pdf`;
    // let document = 'document.pdf'
    console.log("docuent will be ", document);
    let pdfDoc = printer.createPdfKitDocument(dd, options);
    let writeStream = fs.createWriteStream(document);
    pdfDoc.pipe(writeStream);
    pdfDoc.end();
    writeStream.on("finish", () => {
      resolve(document);
      console.log("finalprint ready");
    });
  });
  return aPromise;
};
