let { DateTime } = require("luxon");
var SendClean = require("../SendClean/sendclean");
let fs = require("fs");
const { domainToUnicode } = require("url");

async function sendmailSendClean(mailOptions, cb) {
  const owner_id = "73560329";
  // const owner_id = 'smtp53573991';
  const token = "nusZPizdRgnBetVEdc5rgPE6";
  const SendCleanTES_APP_DOMAIN = "us1-mta1.sendclean.net";
  let to_email = mailOptions.to;
  let subject = mailOptions.subject;
  let emailbody = mailOptions.text;

  let SendClean_client = new SendClean.SendClean(
    owner_id,
    token,
    SendCleanTES_APP_DOMAIN
  );
  let param = {
    message: {
      to: [
        {
          email: `${to_email}`,
          name: `${to_email}`,
          type: "to",
        },
      ],
      html: `${emailbody}`,
      subject: `${subject}`,
      from_email: "donotreply@parikshaworld.com",
      from_name: "donotreply@parikshaworld.com",
    },
    // "owner_id":"73560329","token":"nusZPizdRgnBetVEdc5rgPE6",
    smtp_user_name: "smtp53573991",
  };
  SendClean_client.messages.sendMail(
    param,
    function (result) {
      console.log("successfully sent email");
      cb(0, { response: "email sent successfully" });
    },
    function (e) {
      cb(-1, {
        response: "A SendClean error occurred: " + e.name + " - " + e.message,
      });
      console.log("A SendClean error occurred: " + e.name + " - " + e.message);
    }
  );
}
let successfulReminder = [];
let failedReminder = [];
async function sendmail(mailOptions, logMessage) {
  return new Promise((resolve, reject) => {
    sendmailSendClean(mailOptions, function (error, info) {
      if (error) {
        console.log("error is " + error);
        failedReminder = [...failedReminder, logMessage];
        resolve(false); // or use rejcet(false) but then you will have to handle errors
      } else {
        successfulReminder = [
          ...successfulReminder,
          {
            logMessage,
            to: mailOptions.to,
            subject: mailOptions.subject,
            text: mailOptions.text,
          },
        ];
        console.log("successfulReminder: ", successfulReminder);
        resolve(true);
      }
    });
  });
}

// sendmail(
//   {
//     to: email,
//     subject:
//       "Kirkee Cantonment Board, Application' registration verification Code",
//     text,
//   },
//   logMessage
// );

const doit = async () => {
  let data = fs.readFileSync("./list4Retry.json", "utf8");
  let emailList = JSON.parse(data);
  let subject =
    "Kirkee Cantonment Board (Jr. Clerk), Reminder to complete application before 7th Feb 2023 5:30 pm";
  // console.log("emailList is :", emailList);
  emailList = [...emailList, "smbarge@gmail.com"];
  let promises = emailList.map(async (e) => {
    const currentDate = `${DateTime.now().toLocaleString(
      DateTime.DATE_MED_WITH_WEEKDAY
    )}`;
    const currentTime = `${DateTime.now().toLocaleString(
      DateTime.TIME_WITH_SECONDS
    )}`;
    const logMessage = `health supervisor reminder to complete application email sent to ${e} @ ${currentDate} ${currentTime}`;
    let to = e;

    const text = `Dear Candidate,
        <br>
        <br>
    You have registered for post of ‘Jr. clerk - Kirkee Cantonment Board’ on www.parikshaworld.com with your email id ${e}. However, you have not completed your application form as of ’05 Feb 2023 8:42 AM’ and have not paid the fees. 
        <br>
        <br>

    If you believe you are qualified for this post as per advertisement and are interested in applying for the post, you must complete the application form including fee payment before 07 Feb 2023 5:30 pm.
    Ignore this message, if you have completed the application form and have already paid the fees.
        <br>
        <br>
        <br>
    Kirkee Cantonment Board Support Team
    `;
    console.log("subject is: ", subject);
    console.log("text is: ", text);
    console.log("logMessage is: ", logMessage);
    return sendmail({ to, subject, text }, logMessage);
  });
  await Promise.all(promises);
  fs.writeFileSync(
    "./successReminderList4Retry.json",
    JSON.stringify(successfulReminder, null, 2)
  );
  fs.writeFileSync(
    "./failedReminderList4Retry.json",
    JSON.stringify(failedReminder, null, 2)
  );
};
doit();
