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
let postIdMap = [
  {
    record: "mazdoor",
    postId: "11",
  },
  {
    record: "disinfector",
    postId: "12",
  },
  {
    record: "ayah",
    postId: "13",
  },
  {
    record: "storeCoolie",
    postId: "14",
  },
  {
    record: "safaikarmachari",
    postId: "15",
  },
  {
    record: "driver",
    postId: "21",
  },
  {
    record: "labAttendent",
    postId: "22",
  },
  {
    record: "nursingOrderly",
    postId: "23",
  },

  {
    record: "peon",
    postId: "24",
  },

  {
    record: "watchman",
    postId: "25",
  },

  {
    record: "mason",
    postId: "26",
  },
  {
    record: "pumpAttendant",
    postId: "27",
  },
  {
    record: "malies",
    postId: "28",
  },
  {
    record: "dresser",
    postId: "29",
  },
  {
    record: "autoMechanic",
    postId: "30",
  },
  {
    record: "fitter",
    postId: "31",
  },
  {
    record: "fbsLascar",
    postId: "32",
  },

  {
    record: "labAssistant",
    postId: "41",
  },

  {
    record: "computerProgrammer",
    postId: "601",
  },
  {
    record: "workshopSuperintendent",
    postId: "602",
  },
  {
    record: "firebrigadeSuperintendent",
    postId: "603",
  },
  {
    record: "asstMarketSupdt",
    postId: "604",
  },
  {
    record: "healthSupervisor",
    postId: "605",
  },
  {
    record: "assistantMedicalOfficer",
    postId: "606",
  },
  {
    record: "highSchoolTeacherBEd",
    postId: "607",
  },
  {
    record: "healthInspector",
    postId: "608",
  },
  {
    record: "juniorEngineerElectrical",
    postId: "609",
  },
  {
    record: "juniorEngineerCivil",
    postId: "610",
  },
  {
    record: "juniorClerk",
    postId: "611",
  },
  {
    record: "ledgerClerk",
    postId: "612",
  },
  {
    record: "hindiTypist",
    postId: "613",
  },
  {
    record: "labTechnician",
    postId: "614",
  },
  {
    record: "staffNurse",
    postId: "615",
  },
  {
    record: "dEdTeacher",
    postId: "616",
  },
];
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
  let feesPaidGenOBCFemalesPromises = postIdMap.map(async (e) => {
    let confirmation_client = `${e.record}.confirmation_client`;
    let confirmation_server = `${e.record}.confirmation_server`;
    let condition1 = {};
    let condition2 = {};
    condition1[confirmation_client] = { $exists: true };
    condition2[confirmation_server] = { $exists: true };
    let condition3 = {};
    let condition4 = {};
    let confirmation_client_amount = `${e.record}.confirmation_client.amount`;
    let confirmation_server_amount = `${e.record}.confirmation_server.amount`;
    condition3[confirmation_client_amount] = 40000;
    condition4[confirmation_server_amount] = 40000;

    const filter = {
      $and: [
        { $or: [{ ...condition1 }, { ...condition2 }] },
        { $or: [{ ...condition3 }, { ...condition4 }] },
      ],
      "personalInfo.category": { $nin: ["SC", "ST", "EWS"] },
      "personalInfo.gender": { $nin: ["Transgender"] },
      "personalInfo.pwd": "No",
    };
    // console.log("filter is:", JSON.stringify(filter, null, 2));
    let apps = await applicationSchema.find(filter).toArray();
    apps = apps.map((a) => {
      return {
        appid: a.appid,
        postName: e.record,
        post_appid: a[e.record].appid,
        Name: a.personalInfo.name,
        Email: a.personalInfo.email,
        Mobile: a.personalInfo.mobile,
        Fees: a[e.record].confirmation_client
          ? a[e.record].confirmation_client.amount / 100
          : a[e.record].confirmation_server.amount / 100,
        Payment_id: a[e.record].confirmation_client
          ? a[e.record].confirmation_client.razorpay_payment_id
          : a[e.record].confirmation_server.razorpay_payment_id,
        order_id: a[e.record].confirmation_client
          ? a[e.record].confirmation_client.razorpay_order_id
          : a[e.record].confirmation_server.razorpay_order_id,
        category: a.personalInfo.category,
        gender: a.personalInfo.gender,
        esm: a.personalInfo.exserviceman,
      };
    });
    return { record: e.record, count: apps.length, apps };
  });
  let feesPaidGenOBCFemales = await Promise.all(feesPaidGenOBCFemalesPromises);

  console.log(
    "feesPaidOBCFemales is:",
    JSON.stringify(feesPaidGenOBCFemales, null, 2)
  );
  let finalArray = feesPaidGenOBCFemales.map((e) => {
    return e.apps.map((a) => {
      return { ...a };
    });
  });
  finalArray = finalArray.reduce((a, c) => {
    return [...a, ...c];
  }, []);
  finalArray = finalArray.map((e, i) => {
    return { SrNo: i + 1, ...e };
  });
  console.log("finalArray is:", JSON.stringify(finalArray, null, 2));
  console.log("finalArray length is :", finalArray.length);

  let lines = [];
  let header = Object.keys(finalArray[0]).join(",");
  lines = [header];

  finalArray.forEach((e) => {
    let line = Object.values(e).join(",");
    lines = [...lines, line];
  });

  let data = lines.join("\n");

  fs.writeFileSync("feeIssueCandidates.csv", data);
})();
