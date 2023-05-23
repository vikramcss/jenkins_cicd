"use strict";
let uniqid = require("uniqid");
let schemas = require("./schema");
const Razorpay = require("razorpay");
let { DateTime } = require("luxon");
var crypto = require("crypto");
const bodyParser = require("body-parser");

// app.use(cors())
// app.use(body.Parser.Json())
``;
// register fastify content parser
module.exports = async function (fastify, opts) {
  var instance = new Razorpay({
    key_id: "rzp_live_EbVltehQZxUqlF",
    key_secret: "NEGvNQcWvRpFte2uqpxFYuPI",
  });

  let feeSchema = fastify.mongo.db.collection("fees");
  let applicationSchema = fastify.mongo.db.collection("applications");
  let feeImpactedCandidatesSchema = fastify.mongo.db.collection(
    "feeImpactedCandidates"
  );

  // const getFeesAmount = (category, gender, pwd, exserviceman, govemployee) => {
  //   // let discountFees = (300 * 100).toString();
  //   // let normalFees = (600* 100).toString();

  //   let discountFees = (400 * 100).toString();
  //   let normalFees = (600 * 100).toString();

  //   if (category == "SC" || category == "ST" || category == "EWS")
  //     return discountFees;
  //   if (gender == "Female") return discountFees;
  //   // if (category == "Gen" )return normalFees;
  //   if (gender == "Transgender") return discountFees;
  //   if (pwd == "Yes") return discountFees;
  //   if (exserviceman == "Yes") return discountFees;
  //   if (govemployee == "Yes") return discountFees;

  //   return normalFees;
  // };
  const getFeesAmount = (category, gender, pwd, exserviceman, govemployee) => {
    let discountFees = (400 * 100).toString();
    let normalFees = (600 * 100).toString();

    if (category == "SC" || category == "ST" || category == "EWS")
      return discountFees;
    if (gender == "Transgender") return discountFees;
    if (pwd == "Yes") return discountFees;

    return normalFees;
  };

  fastify.post(
    "/getPaymentId/:postRecord",
    { schema: schemas.getPaymentId, preValidation: [fastify.authenticate] },
    async function (request, reply) {
      const { postRecord } = request.params;
      console.log("Post Record: ", postRecord);
      console.log("Request.body is: ", request.body);
      let application = await applicationSchema.findOne({
        "personalInfo.email": request.user.login,
      });
      let {
        name,
        email,
        mobile,
        category,
        gender,
        pwd,
        widowOrDivorced,
        exserviceman,
        govemployee,
      } = application.personalInfo;
      let applicantInfo = {
        name,
        mobile,
        category,
        email,
        widowOrDivorced,
        amount: getFeesAmount(category, gender, pwd, exserviceman, govemployee),
      };
      console.log("applicantInfo:", applicantInfo);

      var options = {
        amount: applicantInfo.amount, // amount in the smallest currency unit
        currency: "INR",
        receipt: "pcb-01" + uniqid(),
      };
      instance.orders.create(options, function (err, order) {
        console.log("error is :", err);
        if (err) {
          return reply.code(500).send({
            error: -1,
            errorMsg: "unable to create order id, try later",
          });
        }
        console.log("order: ", order);
        console.log("user is : ", request.user);
        feeSchema.insertOne(
          {
            login: request.user.login,
            order,
            postRecord,
            created_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
          },
          (err, result) => {
            if (err) {
              console.log(
                "unable to record the generated payment id in database"
              );
              reply
                .code(500)
                .send({ error: -1, errorMsg: "", orderid: order.id });
              return;
            }
            console.log(
              "document stored in fees collection order_id:",
              order.id,
              " result: ",
              result
            );
            reply.code(200).send({
              error: 0,
              errorMsg: "",
              orderid: order.id,
              order,
              applicantInfo,
            });
          }
        );
      });
    }
  );
  fastify.post(
    "/getPaymentIdAdditional/:postRecord",
    { schema: schemas.getPaymentId, preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        const { postRecord } = request.params;
        console.log("Post Record: ", postRecord);
        console.log("Request.body is: ", request.body);
        let application = await applicationSchema.findOne({
          "personalInfo.email": request.user.login,
        });
        if (!application)
          return { error: -1, errorMsg: "application not found " };

        let {
          name,
          email,
          mobile,
          category,
          gender,
          pwd,
          widowOrDivorced,
          exserviceman,
          govemployee,
        } = application.personalInfo;
        let { appid } = application;

        let feeImpactedRecords = await feeImpactedCandidatesSchema.findOne({
          appid,
        });

        if (!feeImpactedRecords) {
          return { error: -1, errorMsg: "application not fee impacted " };
        }
        let feeImpactedRecord = feeImpactedRecords.applications.find(
          (e) => e.postName == postRecord
        );
        if (!feeImpactedRecord) {
          return {
            error: -1,
            errorMsg: `unable to locate record in application for fee impacted post for ${postRecord} `,
          };
        }

        // let additionalFees = (200 * 100).toString();
        let additionalFees = (2 * 100).toString();
        let applicantInfo = {
          name,
          mobile,
          category,
          email,
          widowOrDivorced,
          amount: additionalFees,
        };
        console.log("applicantInfo:", applicantInfo);

        var options = {
          amount: applicantInfo.amount, // amount in the smallest currency unit
          currency: "INR",
          receipt: "pcb-01" + uniqid(),
        };
        let promise = new Promise((resolve, reject) => {
          instance.orders.create(options, function (err, order) {
            console.log("error is :", err);
            if (err) {
              // return reply.code(500).send({
              //   error: -1,
              //   errorMsg: "unable to create order id, try later",
              // });
              reject({
                error: -1,
                errorMsg: "unable to create order id, try later",
              });
            }
            console.log("order: ", order);
            console.log("user is : ", request.user);
            feeSchema.insertOne(
              {
                login: request.user.login,
                order,
                postRecord,
                additionalFeesAppId: appid,
                created_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
              },
              (err, result) => {
                if (err) {
                  console.log(
                    "unable to record the generated payment id in database"
                  );
                  // reply
                  //   .code(500)
                  //   .send({ error: -1, errorMsg: "", orderid: order.id });
                  // return;
                  reject({ error: -1, errorMsg: "", orderid: order.id });
                }
                console.log(
                  "document stored in fees collection order_id:",
                  order.id,
                  " result: ",
                  result
                );
                // reply.code(200).send({
                //   error: 0,
                //   errorMsg: "",
                //   orderid: order.id,
                //   order,
                //   applicantInfo,
                // });
                resolve({
                  error: 0,
                  errorMsg: "",
                  orderid: order.id,
                  order,
                  applicantInfo,
                });
              }
            );
          });
        });
        let {
          error,
          errorMsg,
          orderid,
          order,
          applicantInfo: lapplicantInfo,
        } = await promise;
        return {
          error,
          errorMsg,
          orderid,
          order,
          applicantInfo: lapplicantInfo,
        };
      } catch (e) {
        console.log("exception in processing getPaymentIdAdditional", e);
        reply
          .code(500)
          .send({ error: e.error, errorMsg: e.errorMsg, orderid: e.orderid });
        return;
      }
    }
  );
  fastify.post("/paymentVerification", async function (req, reply) {
    console.log("/paymentVerification", JSON.stringify(req.headers, null, 2));
    console.log(
      "/paymentVerification request body of payment verification is:",
      req.body
    );
    console.log("payload is", JSON.stringify);
    // const secret = "6fc0acd3-c9cc-4a2b-8b45-72ff57d92a1f";
    // const secret = "d4af4e22-e04c-49d8-b003-6d066e864dff";
    const secret = "59c57aa2-68d1-407f-a6d8-4de55c527532";
    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    const {
      id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount,
    } = req.body.payload.payment.entity;
    const { "x-razorpay-signature": razorpay_signature } = req.headers;
    if (digest === req.headers["x-razorpay-signature"]) {
      let filter = { "order.id": razorpay_order_id };
      try {
        let feeRec = await feeSchema.findOne(filter);
        if (!feeRec) {
          return reply
            .code(406)
            .send({ error: -1, errorMsg: `order record could be located` });
        }
        const postRecord = feeRec.postRecord;
        let confirmation_server = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: feeRec.order.amount,
          updated_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
        };
        let updateRec = {};
        updateRec[`${postRecord}.confirmation_server`] = confirmation_server;
        let updateDoc = { $set: updateRec };
        await feeSchema.updateOne(filter, updateDoc);
        filter = { "personalInfo.email": feeRec.login };
        await applicationSchema.updateOne(filter, updateDoc);
        return reply
          .code(200)
          .send({ error: 0, errorMsg: "", confirmation_server });
      } catch (e) {
        console.log("excepiton in processing payment confirmation:", req, e);
        return reply
          .code(500)
          .send({ error: -1, errorMsg: `internal error, exception ${e}` });
      }
    } else {
      console.log("generated_signature: ", shasum);
      console.log("razorpay_signature : ", x - razorpay - signature);
      return reply
        .code(406)
        .send({ error: -1, errorMsg: `signature did not match` });
    }

    // return res.code(200).send({ req: req.body })
  });

  fastify.post(
    "/recordPaymentResponse",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      let response = request.body.response;
      let secret = "NEGvNQcWvRpFte2uqpxFYuPI";
      var expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(
          (
            response.razorpay_order_id +
            "|" +
            response.razorpay_payment_id
          ).toString()
        )
        .digest("hex");
      console.log("Request.body is: ", request.body);
      if (expectedSignature == response.razorpay_signature) {
        let filter = { "order.id": response.razorpay_order_id };
        try {
          let feeRec = await feeSchema.findOne(filter);
          if (!feeRec) {
            return reply
              .code(406)
              .send({ error: -1, errorMsg: `order record could be located` });
          }
          const postRecord = feeRec.postRecord;
          let confirmation_client = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: feeRec.order.amount,
            updated_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
          };
          let updateRec = {};
          updateRec[`${postRecord}.confirmation_client`] = confirmation_client;
          let updateDoc = { $set: updateRec };
          await feeSchema.updateOne(filter, updateDoc);

          if (feeRec.additionalFeesAppId) {
            // this is additional payment
            filter = {
              appid: feeRec.additionalFeesAppId,
              applications: { $elemMatch: { postName: postRecord } },
            };
            let updateRec = {};
            updateRec["applications.$.confirmation_client"] =
              confirmation_client;
            let updateDoc = { $set: updateRec };
            await feeImpactedCandidatesSchema.updateOne(filter, updateDoc);
            return reply
              .code(200)
              .send({ error: 0, errorMsg: "", confirmation_client });
          } else {
            // this is normal payment
            filter = { "personalInfo.email": request.user.login };
            await applicationSchema.updateOne(filter, updateDoc);
            return reply
              .code(200)
              .send({ error: 0, errorMsg: "", confirmation_client });
          }
        } catch (e) {
          console.log(
            "exception in processing payment confirmation:",
            response,
            e
          );
          return reply
            .code(500)
            .send({ error: -1, errorMsg: `internal error, exception ${e}` });
        }
      } else {
        console.log("generated_signature: ", expectedSignature);
        console.log("razorpay_signature : ", response.razorpay_signature);
        return reply
          .code(406)
          .send({ error: -1, errorMsg: `signature did not match` });
      }
    }
  );
};

// response: {
//   razorpay_payment_id: 'pay_Ij8eFEzUOPMhdY',
//   razorpay_order_id: 'order_Ij8dySx3vzsrFs',
//   razorpay_signature: 'ee5c225bf9e5e236245850592ac24e6dced296677ae0bc46b1fe152abc5dc0f7'
// }
