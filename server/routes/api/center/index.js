"use strict";
const request = require("request");
const autoIncrement = require("mongo-autoincrement");
const fs = require("fs");
const AWS = require("aws-sdk");
const { finalprint } = require("../../../report/kcbFinalPrint");
const bucketName = "pcb01uploads";
const { DateTime } = require("luxon");
let schemas = require("./schema");

// register fastify content parser

module.exports = async function (fastify, opts) {
  const collections = await fastify.mongo.db
    .listCollections({ name: "applications" })
    .toArray();
  if (collections.length == 0)
    fastify.mongo.db.createCollection("applications");
  let centerSchema = fastify.mongo.db.collection("centers");

  fastify.post(
    "/add",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("center/add user is : ", request.user);
        const { center } = request.body;
        await centerSchema.insertOne(center);
        return { error: 0, message: "" };
      } catch (e) {
        console.log(
          "exception in processing center/add :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, message: JSON.stringify(e) };
      }
    }
  );
fastify.post(
    "/edit",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("center/edit user is : ", request.user );
        const { center } = request.body
        const filter = {_id :center._id}
        console.log("center/edit center id : ", center._id);
        delete center._id
        const update = {$set:center }
        console.log("center/edit center is : ", center);
        await centerSchema.updateOne(filter, update);
        return { error: 0, message: "" };
      } catch (e) {
        console.log(
          "exception in processing center/edit :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, message: JSON.stringify(e) };
      }
    }
  )
fastify.post(
    "/delete",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("center/delete user is : ", request.user );
        const { _id } = request.body._id
        const filter = {_id }
        console.log("center/delete center id is: ", _id);
        await centerSchema.deleteOne(filter);
        return { error: 0, message: "" };
      } catch (e) {
        console.log(
          "exception in processing center/delete :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, message: JSON.stringify(e) };
      }
    }
  )
fastify.get(
    "/getAll",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("center/getAll user is : ", request.user);
        let centers = await centerSchema.find({}).toArray()
        return { error: 0, message: "", centers };
      } catch (e) {
        console.log(
          "exception in processing center/getAll :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, message: JSON.stringify(e) };
      }
    }
  )
};
