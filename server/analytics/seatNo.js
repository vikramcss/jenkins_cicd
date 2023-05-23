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

const getCategory = (app) => {
  switch (app.personalInfo.category) {
    case "OBC":
      return "2";
    case "ST":
      return "3";
    case "EWS":
      return "4";
    default:
      return "1";
  }
};

const getHorCategory = (app) => {
  let val = "";
  const { pwd, exserviceman, govemployee, widowOrDivorced } = app.personalInfo;
  if (pwd == "Yes") val = val + "1";
  if (exserviceman == "Yes") val = val + "2";
  if (govemployee == "Yes") val = val + "3";
  if (widowOrDivorced == "Yes") val = val + "4";

  if (val == "") return "0";
  return val;
};

(async () => {
  await connectToDb();
  const applicationSchema = db.collection("applications");
  const filter = {
    status: "qualified",
  };
  // fees paid candidates
  let apps = await applicationSchema.find(filter).toArray();
  let seatNoBaseDataArr = apps.map((a) => {
    return {
      appid: a.appid,
      email: a.personalInfo.email,
      postCode: "7",
      categoryCode: getCategory(a),
      horCategoryCode: getHorCategory(a),
      category: a.personalInfo.category,
      pwd: a.personalInfo.pwd,
      exServiceMan: a.personalInfo.exserviceman,
      kcbEmployee: a.personalInfo.govemployee,
      widowOrDivorced: a.personalInfo.widowOrDivorced,
    };
  });
  //   seatNoBaseDataArr = seatNoBaseDataArr.filter(
  //     (e) => e.exServiceMan == "Yes" && e.pwd == "Yes"
  //   );
  console.log(
    "seatNo base data is: ",
    JSON.stringify(seatNoBaseDataArr, null, 2)
  );
  let lines = [Object.keys(seatNoBaseDataArr[0]).join(",")];
  seatNoBaseDataArr.forEach((e) => {
    console.log(Object.values(e).join(","));
    lines = [...lines, Object.values(e).join(",")];
  });
  let data = lines.join("\n");

  fs.writeFileSync("./outputFile_v2.csv", data);
})();
