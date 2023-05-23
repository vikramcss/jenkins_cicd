"use strict";
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

module.exports = async function (fastify, opts) {
  let applicationSchema = fastify.mongo.db.collection("applications");
  let userSchema = fastify.mongo.db.collection("users");

  fastify.get(
    "/adminSummary",
    // { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        const registeredCount = await userSchema.count({});
        const countSummaryPromises = postIdMap.map(
          async ({ record, postId }) => {
            let filterAll = {
              // fees paid
              $or: [{}, {}],
            };
            filterAll["$or"][0][`${record}.confirmation_client`] = {
              $exists: true,
            };
            filterAll["$or"][1][`${record}.confirmation_server`] = {
              $exists: true,
            };
            filterAll[record] = { $exists: true };
            let filterAllRecs = {
              $or: [{}, {}],
            };
            filterAllRecs[record] = { $exists: true };

            console.log("filterAll is : ", JSON.stringify(filterAll, null, 2));
            let counts = {
              allRecs: await applicationSchema.count(filterAllRecs),
              all: await applicationSchema.count(filterAll),
              sc: await applicationSchema.count({
                ...filterAll,
                "personalInfo.category": "SC",
              }),
              st: await applicationSchema.count({
                ...filterAll,
                "personalInfo.category": "ST",
              }),
              obc: await applicationSchema.count({
                ...filterAll,
                "personalInfo.category": "OBC",
              }),
              gen: await applicationSchema.count({
                ...filterAll,
                "personalInfo.category": "Gen",
              }),
              ews: await applicationSchema.count({
                ...filterAll,
                "personalInfo.category": "EWS",
              }),
              pwd: await applicationSchema.count({
                ...filterAll,
                "personalInfo.pwd": "Yes",
              }),
              exserviceman: await applicationSchema.count({
                ...filterAll,
                "personalInfo.exserviceman": "Yes",
              }),
              govemployee: await applicationSchema.count({
                ...filterAll,
                "personalInfo.govemployee": "Yes",
              }),
              male: await applicationSchema.count({
                ...filterAll,
                "personalInfo.gender": "Male",
              }),
              female: await applicationSchema.count({
                ...filterAll,
                "personalInfo.gender": "Female",
              }),
              Transgender: await applicationSchema.count({
                ...filterAll,
                "personalInfo.gender": "Transgender",
              }),
              widowsOrDivorced: await applicationSchema.count({
                ...filterAll,
                "personalInfo.widowOrDivorced": "Yes",
              }),
            };
            return { record, postId, counts };
          }
        );
        let countSummary = await Promise.all(countSummaryPromises);
        console.log("countSummary: ", countSummary, registeredCount);
        return {
          error: 0,
          errorMsg: "",
          countSummary,
          registeredCount,
        };
      } catch (e) {
        return { error: -1, errorMsg: e };
      }
    }
  );
};
