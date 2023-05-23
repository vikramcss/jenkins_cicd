const fs = require("fs");
const csv = require("csv-parser");
let emails = [];

const runTest = async () => {
  fs.createReadStream("./application.csv")
    .pipe(csv())
    .on("data", ({ email, phone }) => {
      emails.push({
        email,
        phone,
      });
    })
    .on("end", async () => {
      emails = emails.map((e) => e.email);
      console.log("emails are :", emails);
      fs.writeFileSync(
        "./healthSupervisorEmails.json",
        JSON.stringify(emails, null, 2)
      );
    });
};

runTest();
