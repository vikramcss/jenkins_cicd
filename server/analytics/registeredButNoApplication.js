const { MongoClient } = require("mongodb");
const { config } = require("./config/config");

let mongoUri = config.uri;
let dbName = config.db;
let client;
let db;

console.log("config is :", config);
const connectToDb = async () => {
  // connect to mongodb server
  client = await MongoClient.connect(mongoUri, { useNewUrlParser: true });
  db = client.db(dbName);
};

(async () => {
  await connectToDb();
  const applicationSchema = db.collection("applications");
  const userSchema = db.collection("users");
  let apps = await applicationSchema.find({}).toArray();
  console.log("count of applications is : ", apps.length);
  let users = await userSchema.find({}).toArray();
  // 1. users that don't have applications
  let dontHaveEmail = apps.find((a) => !a.personalInfo);
  console.log(
    "personalInfo absent is these many applications: ",
    dontHaveEmail?.length
  );
  console.log("these apps are: ", JSON.stringify(dontHaveEmail, null, 2));
  let notFilledApp = users.filter((u) => {
    let found = apps.find((a) => a.personalInfo?.email == u.email);
    return found ? false : true;
  });
  console.log(
    "count of candidates that have not filled applications is: ",
    notFilledApp.length
  );
  let emails = notFilledApp.map((nf) => nf.email);
  // console.log("emails: ", emails);
})();
