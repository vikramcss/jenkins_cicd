"use strict";
const request = require("request");
const autoIncrement = require("mongo-autoincrement");
const fs = require("fs");
const AWS = require("aws-sdk");
const { finalprint } = require("../../../report/pcbreport02/pcbFinalPrint02");

// const bucketName = 'cmetrsuploads';
const bucketName = "pcb01uploads";

const accessKeyId = "AKIASBOROETZ2N5PRX4X";
const secretAccessKey = "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";
const { DateTime } = require("luxon");

let schemas = require("./schema");

module.exports = async function (fastify, opts) {
  fastify.get(
    "/getPhotoSign/:rollNumber",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      const { rollNumber } = request.params;
      let photo =
        "https://pcb01uploads.s3.ap-south-1.amazonaws.com/upload_file-405opeilclk3hqr-1673072379027.jpg";
      let sign =
        "https://pcb01uploads.s3.ap-south-1.amazonaws.com/upload_file-406z02jlclk3pit-1673072389109.jpg";

      return { rollNumber, photo, sign };
    }
  );
};
/// design of the tables.

const centerMaster = [
  {
    centerCode: "",
    name: "",
    address: "",
  },
];

const examMaster = [
  {
    examId: "",
    examTitle: "",
    advertisementRef: "",
    reportingTime: "",
    examStartTime: "",
    examEndTime: "",
    examDuration: "",
  },
];

const rollNumbers = [
  {
    rollNumber: "",
    centerCode: "",
    examId: "",
    appid: "", // appid of the profile
    postRecord: "",
    postId: "",
  },
];
