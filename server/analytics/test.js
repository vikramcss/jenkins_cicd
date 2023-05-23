
const { MongoClient } = require("mongodb");
const { config } = require("./config/config");
let fs = require("fs");

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
  const filter = {
    $or: [
      { confirmation_client: { $exists: true } },
      { confirmation_server: { $exists: true } },
    ],
  };
  // fees paid candidates
  let apps = await applicationSchema.find(filter).toArray();
  console.log("fees paid candidates is: ", apps.length);
  const allCandidates = await userSchema.find({}).toArray();
  // console.log("allCandidates: ", JSON.stringify(allCandidates, null, 2));
  const notFilledForm = allCandidates
    .filter((ac) => !apps.find((a) => a.personalInfo.email == ac.login))
    .map((ac) => ac.login);
  console.log("not Filled up form count is: ", notFilledForm.length);
  fs.writeFile(
    "notFilledForm.json",
    JSON.stringify(notFilledForm, null, 2),
    (err) => {
      console.log("successfully written file");
    }
    // 05 Feb 2023, 8:50 am
  );
})();
