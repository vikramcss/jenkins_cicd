
"use strict";
const request = require("request");
const autoIncrement = require("mongo-autoincrement");
const fs = require("fs");
const AWS = require("aws-sdk");
const { finalprint } = require("../../../report/kcbFinalPrint");
const bucketName = "pcb01uploads";
const { DateTime } = require("luxon");
// let schemas = require("./schema");

// register fastify content parser

module.exports = async function (fastify, opts) {
  const collections = await fastify.mongo.db
    .listCollections({ name: "applications" })
    .toArray();

  let applicationschema = fastify.mongo.db.collection('applications')
  fastify.post(
    "/getSCApplication",
    // { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("center/add user is : ", request.body);
        const { category } = request.body;

        let applicaiton = await applicationschema.find({'personalInfo.category':`${category}`}).toArray() 
        console.log('applications is ',JSON.stringify(applicaiton,null,2))
        return { error: 0, message: "" ,application:[...applicaiton]};
      } catch (e) {
        console.log(
          "exception in processing center/add :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, message: JSON.stringify(e) };
      }
    }
  );
};
