"use strict";
const request = require("request");
let schemas = require("./schema");

module.exports = async function (fastify, opts) {
  let applicationSchema = fastify.mongo.db.collection("applications");
  let feeImpactedCandidatesSchema = fastify.mongo.db.collection(
    "feeImpactedCandidates"
  );
  fastify.get(
    "/",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      const email = request.user.login;
      let application = await applicationSchema.findOne({
        "personalInfo.email": email,
      });
      if (!application)
        return {
          error: -1,
          errorMsg: "application not found",
          isFeeImpacted: false,
        };
      let { appid } = application;
      let impactedRecord = await feeImpactedCandidatesSchema.findOne({ appid });
      if (!impactedRecord) {
        return {
          error: 0,
          errorMsg: "",
          isFeeImpacted: false,
        };
      }
      return {
        error: 0,
        errorMsg: "",
        isFeeImpacted: true,
        impactedRecord,
      };

      console.log("route api/feeImpacted user is : \n", user);
      return {
        error: 0,
        errorMsg: "",
        isFeeImpacted: true,
        impactedRecord: { foo: "bar" },
      };
    }
  );
};
