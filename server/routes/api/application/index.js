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

// register fastify content parser

module.exports = async function (fastify, opts) {
  const collections = await fastify.mongo.db
    .listCollections({ name: "applications" })
    .toArray();
  if (collections.length == 0)
    fastify.mongo.db.createCollection("applications");
  let formscheduleSchema = fastify.mongo.db.collection("formschedule");
  let applicationSchema = fastify.mongo.db.collection("applications");
  let postsMasterSchema = fastify.mongo.db.collection("postsMaster");
  let userSchema = fastify.mongo.db.collection("users");
  var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
  };
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
  });
  const uploadFile = (srcFileName, awsFileName, cb) => {
    console.log("srcFileName: ", srcFileName);
    console.log("awsFileName: ", awsFileName);
    let data = fs.createReadStream(srcFileName);
    const params = {
      Bucket: bucketName,
      Key: awsFileName, // file will be saved as testBucket/contacts.csv
      Body: data,
      ACL: "public-read",
      contentType: "application/pdf",
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) {
        console.log("s3Err ", s3Err);
        return cb(-1, null);
      }
      console.log(`File uploaded successfully at ${data.Location}`);
      cb(0, data.Location);
    });
  };
  const stream = require("stream");
  const uploadStream = ({ Bucket, Key, ACL, contentType }) => {
    const s3 = new AWS.S3();
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: s3
        .upload({ Bucket, Key, ACL, contentType, Body: pass })
        .promise(),
    };
  };
  const uploadFileV2 = async (srcFileName, awsFileName) => {
    console.log("srcFileName:", srcFileName, "awsFileName:", awsFileName);
    const { writeStream, promise } = uploadStream({
      Bucket: bucketName,
      Key: awsFileName,
      ACL: "public-read",
      contentType: "application/pdf",
    });
    const readStream = fs.createReadStream(srcFileName);
    const pipeline = readStream.pipe(writeStream);

    try {
      console.log("promise is: ", promise);
      let data = await promise;
      return [0, data.Location];
    } catch (err) {
      console.log(
        "uploadFileV2 exception thrown while processing request error: ",
        err
      );
      return [-1, ""];
    }
  };
  const createPdfAndUpload = (applicant, postId, postRecord, postName) => {
    console.log("postIdis createPdfAndUpload", postId);
    return new Promise((resolve, reject) => {
      let photosrc = `https://pcb01uploads.s3.ap-south-1.amazonaws.com/${applicant.uploads.photo}`;
      let photodest = `report/downloads/${applicant.uploads.photo}`;
      download(photosrc, photodest, () => {
        let signsrc = `https://pcb01uploads.s3.ap-south-1.amazonaws.com/${applicant.uploads.sign}`;
        let signdest = `report/downloads/${applicant.uploads.sign}`;
        download(signsrc, signdest, async () => {
          console.log("before finalprint");
          let document = "";
          try {
            document = await finalprint({
              application: applicant,
              postId,
              postRecord,
              postName,
            });
            console.log("document", document);
          } catch (e) {
            console.log("error in finalprint", e);
          }
          console.log("after finalprint document is: ", document);

          console.log("final print doc created", document);
          fs.unlink(photodest, (err) => {
            if (err)
              console.log("error in deleting the temp photfile: ", photodest);
            if (err) reject(err);
          });
          fs.unlink(signdest, (err) => {
            if (err)
              console.log("error in deleting the temp signfile: ", signdest);
            if (err) reject(err);
          });
          let awsFileName = document.split("/")[2];
          console.log("before uploadFileV2 awsFileName is:", awsFileName);
          try {
            let [error, cloudFile] = await uploadFileV2(document, awsFileName);
            console.log("after uploadFileV2 error:", error);
            fs.unlink(document, (err) => {
              if (err)
                console.log("error in deleting the temp document: ", document);
            });
            if (error) return reject(error);
            return resolve([0, cloudFile]);
          } catch (e) {
            fs.unlink(document, (err) => {
              if (err)
                console.log("error in deleting the temp document: ", document);
            });
            return reject(e);
          }
        });
      });
    });
  };

  fastify.get(
    "/getApplication",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("user is : ", request.user);
        let application = await applicationSchema.findOne({
          "personalInfo.email": request.user.login,
        });
        console.log("application is: ", JSON.stringify(application, null, 2));
        let mobileNo = await userSchema.findOne({ login: request.user.login });

        console.log("get mobile ", mobileNo);
        return application
          ? {
              error: 0,
              errorMsg: "",
              login: request.user.login,
              mobile: mobileNo.mobile,
              application: application,
            }
          : {
              error: -1,
              errorMsg: "",
              login: request.user.login,
              mobile: mobileNo.mobile,
              application: {},
            };
      } catch (e) {
        console.log(
          "exception in processing /getPersonalInfo :",
          JSON.stringify(e, null, 2)
        );
        return {
          error: -1,
          errorMsg: JSON.stringify(e),
          login: request.user.login,
          personalInfo: {},
        };
      }
    }
  );

  fastify.get("/getFormSchedule", async function (request, reply) {
    try {
      let formschedule = await formscheduleSchema.findOne({
        examName: "cb-01-2022",
      });
      console.log("formschedule is: ", JSON.stringify(formschedule, null, 2));
      return formschedule
        ? {
            error: 0,
            errorMsg: "",
            endDatetime: formschedule.endDatetime,
            startDatetime: formschedule.startDatetime,
            formschedule: {},
          }
        : {
            error: -1,
            errorMsg: "",
            endDatetime: formscheduleSchema.endDatetime,
            startDatetime: formscheduleSchema.startDatetime,
            formschedule: {},
          };
    } catch (e) {
      console.log(
        "exception in processing /getFormSchedule :",
        JSON.stringify(e, null, 2)
      );
      return { error: -1, errorMsg: JSON.stringify(e) };
    }
  });

  fastify.get("/getCurrentDate", async function (request, reply) {
    try {
      let currentDate = DateTime.now().setZone("Asia/Calcutta").toISO();
      console.log("currentDate is:", currentDate);
      return { currentDate, error: 0, errorMsg: "" };
    } catch (e) {
      console.log(
        "exception in processing /getCurrentDate :",
        JSON.stringify(e, null, 2)
      );
      return { error: -1, errorMsg: JSON.stringify(e) };
    }
  });

  fastify.get(
    "/getPersonalInfo",
    { schema: schemas.getPersonalInfo, preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("user is : ", request.user.login);
        let application = await applicationSchema.findOne({
          "personalInfo.email": request.user.login,
        });
        console.log("application is: ", JSON.stringify(application, null, 2));
        return application
          ? {
              error: 0,
              errorMsg: "",
              login: request.user.login,
              personalInfo: application.personalInfo,
            }
          : {
              error: -1,
              errorMsg: "",
              login: request.user.login,
            };
      } catch (e) {
        console.log(
          "exception in processing /getPersonalInfo :",
          JSON.stringify(e, null, 2)
        );
        return {
          error: -1,
          errorMsg: JSON.stringify(e),
          login: request.user.login,
          personalInfo: {},
        };
      }
    }
  );
  fastify.post(
    "/saveApplication",
    { schema: schemas.saveApplication, preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("save application called request.body is", request.body);
        const email = request.user.login;
        let application = await applicationSchema.findOne({
          "personalInfo.email": email,
        });
        if (application) {
          let result = await applicationSchema.updateOne(
            { "personalInfo.email": email },
            {
              $set: {
                ...request.body,
                updated_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
              },
            }
          );
        } else {
          const appid = await autoIncrement(
            fastify.mongo.db,
            "applications",
            "appid"
          );
          let result = await applicationSchema.insertOne({
            ...request.body,
            appid,
            created_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
          });
        }
        application = await applicationSchema.findOne({
          "personalInfo.email": email,
        });
        console.log("email is: ", email);
        console.log("applications is: ", JSON.stringify(application, null, 2));
        return { error: 0, errorMsg: "", application };
      } catch (e) {
        console.log(
          "exception in processing /saveApplication :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, errorMsg: JSON.stringify(e), application: {} };
      }
    }
  );
  fastify.post(
    "/savePostApplication/:postRecord",
    { schema: schemas.saveApplication, preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log(
          "savePostApplication application called request.body is: ",
          JSON.stringify(request.body)
        );
        console.log("savePostApplication params are: ", request.params);
        const email = request.user.login;
        const filter = { "personalInfo.email": request.user.login };
        // 1. find if the record is present
        // 2. if the record is not present then create sequence for it.
        let application = await applicationSchema.findOne(filter);
        if (!application) return reply.code(400).send({ error: -2 });
        let { postRecord } = request.params;
        let updateDoc;
        let updateRec = {};
        console.log("allocation for the post of: ", postRecord);
        console.log("Record is:", application[postRecord]);
        console.log("application is:", JSON.stringify(application, null, 2));
        console.log(
          "application has property : ",
          postRecord,
          ": ",
          postRecord in application
        );
        if (!(postRecord in application)) {
          const appid = await autoIncrement(
            fastify.mongo.db,
            `${postRecord}`,
            "appid"
          );
          updateRec[`${postRecord}.appid`] = appid;
        }
        let props = Object.keys(request.body[postRecord]);
        props.forEach((p) => {
          updateRec[`${postRecord}.${p}`] = request.body[postRecord][p];
        });
        updateDoc = { $set: updateRec };
        await applicationSchema.updateOne(filter, updateDoc);

        application = await applicationSchema.findOne({
          "personalInfo.email": email,
        });
        return { error: 0, errorMsg: "", application };
      } catch (e) {
        console.log(
          "exception in processing /savePostApplication :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, errorMsg: JSON.stringify(e), application: {} };
      }
    }
  );

  fastify.get(
    "/printApplication/:postId/:postRecord/:postName",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      console.log("print application ##1");
      try {
        const email = request.user.login;
        const { postId, postRecord, postName } = request.params;
        console.log("postId .......", postRecord);
        console.log("print application ##2");
        let application = await applicationSchema.findOne({
          "personalInfo.email": email,
        });
        // console.log('app',application)
        if (!application)
          return reply.code(403).send("Bad request, applicant not found");
        // let payment_confirmation = application.confirmation_client ? application.confirmation_client : application.confirmation_server;
        // if (!payment_confirmation) return reply.code(403).send('Bad request, applicant has not paid fees')

        console.log("printApplication ##2.1", application);

        if (application) {
          console.log("before createPdfAndUpload ");
          let [err, filename] = await createPdfAndUpload(
            application,
            postId,
            postRecord,
            postName
          );
          console.log("filename", filename, "error:", err);
          if (!err) {
            console.log("printApplication ##3");
            let printApplication = {
              at: DateTime.now().setZone("Asia/Calcutta").toISO(),
              filename,
            };
            let updateRec = {};
            updateRec[`${postRecord}.printApplication`] = printApplication;

            let updateDoc = {
              $set: updateRec,
            };
            let filter = { "personalInfo.email": email };
            let result = await applicationSchema.updateOne(filter, updateDoc);

            application = await applicationSchema.findOne({
              "personalInfo.email": email,
            });
            console.log("file", filename);
            return { error: 0, errorMsg: "", filename, application };
          } else {
            return reply.code(500).send("unable to create and upload pdf");
          }
        }
      } catch (e) {
        console.log("exception caught printApplication ##4", e);
        console.log(
          "exception in processing /printApplication :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, errorMsg: JSON.stringify(e) };
      }
    }
  );
};
