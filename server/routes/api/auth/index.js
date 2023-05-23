"use strict";
var SendClean = require("../../../SendClean/sendclean");
var qs = require("querystring");
var http = require("https");

const { spawn } = require("child_process");
const { uuid } = require("uuidv4");
const { DateTime } = require("luxon");
let schemas = require("./schema");
const { default: fastify } = require("fastify");
let svgCaptcha = require("svg-captcha");
var path = require("path");
///
module.exports = async function (fastify, opts) {
  let mobileRegistrationRequestsSchema = fastify.mongo.db.collection(
    "mobileregistrationrequests"
  );
  let registrationRequestSchema = fastify.mongo.db.collection(
    "registrationrequests"
  );
  let exciserecordSchema = fastify.mongo.db.collection("exciserecords");
  let userSchema = fastify.mongo.db.collection("users");
  let adminSchema = fastify.mongo.db.collection("admins");
  let reviewSchema = fastify.mongo.db.collection("reviewuser");
  let centerUserSchema = fastify.mongo.db.collection("centerusers");
  let forgotpasswordrequestSchema = fastify.mongo.db.collection(
    "forgotpasswordrequests"
  );
  let captchaSchema = fastify.mongo.db.collection("captchas");
  let applicationSchema = fastify.mongo.db.collection("applications");

  let passwordCriteria = {
    len: {
      satisfied: false,
    },
    letters: {
      satisfied: false,
    },
    specialchar: {
      satisfied: false,
    },
    digits: {
      satisfied: false,
    },
    reenter: {
      satisfied: false,
    },
  };

  const validatePassword = (value) => {
    passwordCriteria.len.satisfied = false;
    passwordCriteria.letters.satisfied = false;
    passwordCriteria.digits.satisfied = false;
    passwordCriteria.specialchar.satisfied = false;

    if (value.length >= 8 && value.length <= 15)
      passwordCriteria.len.satisfied = true;
    if (/[a-zA-Z]/.test(value)) passwordCriteria.letters.satisfied = true;
    if (/[ !\\"#$%&'\(\)\*\+,-\.:;<=>\?@\[\\\]\^_`\{\|\}~]/.test(value))
      passwordCriteria.specialchar.satisfied = true;
    if (/[0-9]/.test(value)) passwordCriteria.digits.satisfied = true;

    if (
      passwordCriteria.len.satisfied === false ||
      passwordCriteria.letters.satisfied === false ||
      passwordCriteria.digits.satisfied === false ||
      passwordCriteria.specialchar.satisfied === false
    )
      return false;

    return true;
  };

  async function updateVerificationStatus(success, verificationId) {
    const query = { verificationId: verificationId };
    const update = {
      $set: {
        verificationStatus: {
          success,
          at: DateTime.now().setZone("Asia/Calcutta").toISO(),
        },
      },
    };
    try {
      await registrationRequestSchema.updateOne(query, update);
    } catch (e) {
      fastify.log.error(
        "failed to update the email status for varificationId:"
      );
    }
  }

  async function updateEmailStatus(success, verificationId) {
    const query = { verificationId: verificationId };
    const update = {
      $set: {
        emailStatus: {
          success,
          at: DateTime.now().setZone("Asia/Calcutta").toISO(),
        },
      },
    };
    try {
      await registrationRequestSchema.updateOne(query, update);
    } catch (e) {
      fastify.log.error(
        "failed to update the email status for varificationId:"
      );
    }
  }

  async function updateMobileStatus(success, verificationId) {
    const query = { verificationId: verificationId };
    console.log("query in ", query);
    const update = {
      $set: {
        mobileStatus: {
          success,
          at: DateTime.now().setZone("Asia/Calcutta").toISO(),
        },
      },
    };
    try {
      await mobileRegistrationRequestsSchema.updateOne(query, update);
    } catch (e) {
      console.log("error in update", e);
      fastify.log.error(
        "failed to update the mobile status for mobileVarificationId:"
      );
    }
  }

  // async function sendmailSendClean(mailOptions, cb) {
  //   let to_email = mailOptions.to;
  //   let subject = mailOptions.subject;
  //   let emailbody = mailOptions.text;
  //   let dataToSend ;

  //   console.log(`about to call python to send email ${to_email} ${subject} ${emailbody}`)
  //   const python = spawn('python', ['sendclean/python/trial.py', `${to_email}`, `${subject}`, `${emailbody}`]);
  //   python.stdout.on('data', function (data) {
  //     console.log('Pipe data from python script ...');
  //     dataToSend = data.toString();
  //   });

  //   python.on('close', (code) => {
  //     console.log(`child process close all stdio with code ${code}`);
  //     // send data to browser
  //     console.log(dataToSend)
  //     cb(0, { response: 'all mails are success by default' })
  //   });
  // }
  async function sendmailSendClean(mailOptions, cb) {
    const owner_id = "73560329";
    // const owner_id = 'smtp53573991';
    const token = "nusZPizdRgnBetVEdc5rgPE6";
    const SendCleanTES_APP_DOMAIN = "us1-mta1.sendclean.net";
    let to_email = mailOptions.to;
    let subject = mailOptions.subject;
    let emailbody = mailOptions.text;

    let SendClean_client = new SendClean.SendClean(
      owner_id,
      token,
      SendCleanTES_APP_DOMAIN
    );
    let param = {
      message: {
        to: [
          {
            email: `${to_email}`,
            name: `${to_email}`,
            type: "to",
          },
        ],
        html: `${emailbody}`,
        subject: `${subject}`,
        from_email: "donotreply@parikshaworld.com",
        from_name: "donotreply@parikshaworld.com",
      },
      // "owner_id":"73560329","token":"nusZPizdRgnBetVEdc5rgPE6",
      smtp_user_name: "smtp53573991",
    };
    SendClean_client.messages.sendMail(
      param,
      function (result) {
        console.log("successfully sent email");
        cb(0, { response: "email sent successfully" });
      },
      function (e) {
        cb(-1, {
          response: "A SendCleanerror occurred: " + e.name + " - " + e.message,
        });
        console.log("A SendCleanerror occurred: " + e.name + " - " + e.message);
      }
    );
  }
  async function sendmail(mailOptions, registration) {
    return new Promise((resolve, reject) => {
      // fastify.mailer.sendMail(mailOptions, function (error, info) {
      sendmailSendClean(mailOptions, function (error, info) {
        if (error) {
          console.log("error is " + error);
          updateEmailStatus(false, registration.verificationId);
          resolve(false); // or use rejcet(false) but then you will have to handle errors
        } else {
          console.log("Email sent: " + info.response);
          console.log("mailOptions: ", JSON.stringify(mailOptions, null, 2));
          updateEmailStatus(true, registration.verificationId);
          resolve(true);
        }
      });
    });
  }

  async function sendmailForgotPassword(mailOptions, mailresult) {
    return new Promise((resolve, reject) => {
      // fastify.mailer.sendMail(mailOptions, async (error, info) => {
      sendmailSendClean(mailOptions, async function (error, info) {
        let result = await mailresult(error, info);
        resolve(result);
      });
    });
  }

  const getMobileVerificationCode = async ({ mobile, verificationCode }) => {
    let promise = new Promise((resolve, reject) => {
      let url = `https://m1.sarv.com/api/v2.0/sms_campaign.php?token=210798033864006fa847b300.99120145&user_id=81771211&route=OT&template_id=11245&sender_id=PCBJOB&language=EN&template=Your+6+digit+mobile+verification+code+for+%22Pune+Cantonment+Board%2C+Pune%2C%28Application+for+post+of+34+Various+Posts+and+advertisement+dated+04-March-2023%22+is%3A+${verificationCode}+PCBJOB&contact_numbers=${mobile}`;
      http
        .get(url, (res) => {
          let data = [];
          const headerDate =
            res.headers && res.headers.date
              ? res.headers.date
              : "no response date";
          console.log("Status Code:", res.statusCode);
          console.log("Date in Response header:", headerDate);
          if (res.statusCode != 200) {
            reject({ error: -1, errorMsg: "response code is not 200" });
          }
          res.on("data", (chunk) => {
            data.push(chunk);
          });

          res.on("end", () => {
            console.log("Response ended: ");
            const resp = JSON.parse(Buffer.concat(data).toString());
            console.log("resp is:", resp);
            if (resp.msg !== "success") {
              reject({
                error: -2,
                errorMsg: `send sms failed with msg ${resp.msg}`,
              });
            } else {
              resolve({ error: 0 });
            }
          });
        })
        .on("error", (err) => {
          console.log("Error: ", err.message);
          reject({ error: -1, errorMsg: err.message });
        });
    });
    return promise;
  };

  fastify.post(
    "/registerLicensee",
    { schema: schemas.registerLicensee },
    async function (request, reply) {
      let d = new Date();
      let verificationCode = (
        (Math.floor(Math.random() * 1000) + d.getTime()) %
        1000000
      )
        .toString()
        .padStart(6, "0");
      let registrationRequest = {
        ...request.body,
        verificationId: uuid(),
        verificationCode,
        validTill: DateTime.now()
          .plus({ minutes: 5 })
          .setZone("Asia/Calcutta")
          .toISO(),
      };
      // const result = registrationRequestSchema.insertOne(registrationRequest);
      const toInsert = registrationRequest;
      const options = { upsert: true, returnDocument: "after" };
      try {
        const { value: registration } =
          await registrationRequestSchema.findOneAndUpdate(
            { _id: fastify.mongo.ObjectId() },
            { $setOnInsert: toInsert },
            options
          );
        const { email } = request.body;
        sendmail(
          {
            to: email,
            subject:
              "Kirkee Cantonment Board, Application' registration verification Code",
            text: verificationCode,
          },
          registration
        );
        return registration;
      } catch (e) {
        fastify.log.error("Error in inserting document");
        return reply
          .code(500)
          .send(
            "Internal error, unable to add registration request to database"
          );
      }
    }
  );

  fastify.post(
    "/validateVerificationCode",
    { schema: schemas.validateVerificationCode },
    async function (request, reply) {
      let currentTime = DateTime.now();
      let { licenseNo, verificationId, verificationCode } = request.body;

      const registration = await registrationRequestSchema.findOne({
        verificationId,
        "licenseInfo.licenseNo": licenseNo,
        verificationCode,
      });

      if (!registration)
        return { matched: false, errorMsg: "varificationCode not found" };
      let validTill = DateTime.fromISO(registration.validTill);
      if (currentTime > validTill)
        return reply.send({
          matched: false,
          errorMsg: "verification code expired",
        });

      const { licenseType, district } = registration.licenseInfo;

      const exciserecord = await exciserecordSchema.findOne({
        licenseType,
        licenseNo,
        district,
      });
      if (!exciserecord)
        return reply.code(500).send({
          matched: false,
          errorMsg:
            "Internal server error. Unable to locate excise record for licensee",
        });
      console.log("exciserecord:", exciserecord);
      updateVerificationStatus(true, verificationId);
      return { matched: true, login: exciserecord.login };
    }
  );

  fastify.post(
    "/createLogin",
    { schema: schemas.createLogin },
    async function (request, reply) {
      const { login, password, verificationId, mobile } = request.body;

      const registration = await registrationRequestSchema.findOne({
        verificationId,
        email: login,
      });

      if (!registration)
        return {
          success: false,
          error: -1,
          errorMsg: "invalid verificationId or login",
        };
      if (!registration.verificationStatus.success)
        return {
          success: false,
          error: -1,
          errorMsg: "verification is incomplete",
        };
      let luser = await userSchema.findOne({ login });
      if (luser) fastify.log.info("user is :", luser);
      if (luser)
        return {
          success: false,
          error: -1,
          errorMsg: `can't create user, user with id ${login} is already registered`,
        };

      const toInsert = {
        login: login,
        password: password,
        email: registration.email,
        mobile: mobile,
        created_at: DateTime.now().setZone("Asia/Calcutta").toISO(),
      };
      const options = { upsert: true, returnDocument: "after" };
      const { value: user } = await userSchema.findOneAndUpdate(
        { _id: fastify.mongo.ObjectId() },
        { $setOnInsert: toInsert },
        options
      );

      return { success: true, error: 0, errorMsg: "" };
    }
  );

  fastify.post(
    "/forgotPassword",
    { schema: schemas.forgotPassword },
    async function (request, reply) {
      const { login } = request.body;
      let user = await userSchema.findOne({ login });
      if (!user)
        return { success: false, error: -1, errorMsg: "invalid username" };

      const { email } = user;
      console.log("email is: ", email);
      let resetId = uuid();
      console.log("headers are: ", request.headers);
      let result = await sendmailForgotPassword(
        {
          to: email,
          subject: "PCB,Pune Link to reset your password",

          text: `${request.headers.origin}/resetpassword/${resetId}`,
        },
        async (error, info) => {
          const toInsert = {
            login,
            validTill: DateTime.now()
              .plus({ minutes: 5 })
              .setZone("Asia/Calcutta")
              .toISO(),
            emailStatus: {
              success: error ? false : true,
              at: DateTime.now().setZone("Asia/Calcutta").toISO(),
            },
            resetId,
          };
          const options = { upsert: true, returnDocument: "after" };
          try {
            const { value: entry } =
              await forgotpasswordrequestSchema.findOneAndUpdate(
                { _id: fastify.mongo.ObjectId() },
                { $setOnInsert: toInsert },
                options
              );
            console.log(
              "insert to forgotpasswordrequestSchema returned, no exception raised:",
              JSON.stringify(entry, null, 2)
            );
            if (error) return false;
            return true;
          } catch (e) {
            console.log("insert to forgotpasswordrequestSchema failed");
            fastify.log.error("Error in inserting document");
            return false;
          }
        }
      );
      if (result) return { success: true, error: 0, errorMsg: "" };
      return { success: false, error: -1, errorMsg: "Failed to send email" };
    }
  );
  fastify.post(
    "/verifyResetPasswordId",
    { schema: schemas.verifyResetPasswordId },
    async function (request, reply) {
      let currentTime = DateTime.now();
      let { resetId } = request.body;

      let found = await forgotpasswordrequestSchema.findOne({ resetId });
      if (!found)
        return { valid: false, error: -1, errorMsg: "could not find resetId" };

      let validTill = DateTime.fromISO(found.validTill);
      if (currentTime > validTill)
        return { valid: false, error: -1, errorMsg: "resetId has expiried" };

      console.log("Login: ", found.login);

      return { valid: true, error: -1, errorMsg: "", login: found.login };
    }
  );

  fastify.get(
    "/getcaptcha",
    { schema: schemas.getcaptcha },
    async function (request, reply) {
      try {
        await svgCaptcha.loadFont(
          path.join(`${__dirname}/fonts/Roboto-Black.ttf`)
        );
        let options = {
          noise: 9,
          width: 200,
          height: 70,
          ignoreChars: "015b9gIloOpq",
        };
        let captcha = svgCaptcha.create(options);
        let id = uuid();
        await captchaSchema.insertOne({
          id,
          createdAt: DateTime.now().setZone("Asia/Calcutta").toISO(),
          validTill: DateTime.now()
            .plus({ minutes: 5 })
            .setZone("Asia/Calcutta")
            .toISO(),
          text: captcha.text,
        });
        return { error: 0, errorMsg: "", id, captcha: captcha.data };
      } catch (e) {
        console.log("error in generating captch", e);
        return reply
          .code(500)
          .send("Internal error, unable to generate captcha");
      }
    }
  );

  // login for admit card and app form print
  fastify.post(
    "/login",
    { schema: schemas.login },
    async function (request, reply) {
      let { login, password, captcha } = request.body;
      let currentTime = DateTime.now();
      try {
        let captchaRecord = await captchaSchema.findOne({ id: captcha.id });
        if (!captchaRecord)
          return {
            error: -1,
            errorMsg: "Invalid Captcha, not found in db",
            success: false,
          };
        let validTill = DateTime.fromISO(captchaRecord.validTill);
        if (currentTime > validTill)
          return { error: -1, errorMsg: "Captcha expired", success: false };
        if (captcha.text !== captchaRecord.text)
          return { error: -1, errorMsg: "Invalid Captcha", success: false };

        let user = await userSchema.findOne({ login, password });
        if (!user)
          return {
            error: -1,
            errorMsg: "Invalid username or password",
            success: false,
          };

        // let application = await applicationSchema.findOne({ 'personalInfo.email':login , confirmation_client : {$exists: true}});
        // if (!application) return { error: -1, errorMsg: 'Your application form was not completed within time, you can not sign in now', success: false }

        const token = fastify.jwt.sign({ login });
        return { error: 0, errorMsg: "", success: true, token };
      } catch (e) {
        console.log("error in login", e);
        return reply.code(500).send("Internal error, unable to login");
      }
    }
  );

  fastify.get(
    "/logout",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      return { error: 0, errorMsg: "" };
    }
  );

  fastify.post(
    "/resetPassword",
    { schema: schemas.resetPassword },
    async function (request, reply) {
      let { login, password, resetId } = request.body;
      let currentTime = DateTime.now();
      try {
        if (!validatePassword(password))
          return { error: -1, errorMsg: "password criteria is not met" };

        let forgotPassword = await forgotpasswordrequestSchema.findOne({
          resetId,
        });
        if (!forgotPassword) return { error: -1, errorMsg: "Invalid resetId" };

        let validTill = DateTime.fromISO(forgotPassword.validTill);
        if (currentTime > validTill)
          return { error: -1, errorMsg: "resetId has expired" };

        let user = await userSchema.findOne({ login });
        if (!user) return { error: -1, errorMsg: "User not found" };

        await userSchema.updateOne({ login }, { $set: { password } });
        await forgotpasswordrequestSchema.deleteOne({ resetId });

        return { error: 0, errorMsg: "" };
      } catch (e) {
        console.log("error in resetPassword", e);
        return reply.code(500).send("Internal error, unable to resetPassword");
      }
    }
  );

  fastify.post(
    "/sendVerificationCode",
    { schema: schemas.sendVerificationCode },
    async function (request, reply) {
      let { email } = request.body;
      email = email.toLowerCase();

      let d = new Date();
      console.log("will attempt to find email: ", email, " in user schema");
      // const found = await userSchema.findOne({ login: {$regex: email, $options: "i"} })
      const found = await userSchema.findOne({
        login: { $regex: email, $options: "i" },
      });
      if (found) {
        console.log("oops the user is already present");
        return {
          error: -1,
          errorMsg: "user is already registered do you want to signin",
        };
      } else {
        console.log(
          "user for email not found: ",
          email,
          " in user schema, will go ahead and send verificaiton code"
        );
      }
      let verificationCode = (
        (Math.floor(Math.random() * 1000) + d.getTime()) %
        1000000
      )
        .toString()
        .padStart(6, "0");
      let registrationRequest = {
        // ...request.body,
        email,
        verificationId: uuid(),
        verificationCode,
        validTill: DateTime.now()
          .plus({ minutes: 5 })
          .setZone("Asia/Calcutta")
          .toISO(),
      };
      // const result = registrationRequestSchema.insertOne(registrationRequest);
      const toInsert = registrationRequest;
      const options = { upsert: true, returnDocument: "after" };
      try {
        const found = await userSchema.findOne({ email });
        if (found)
          return {
            error: -1,
            errorMsg:
              "This email id is allready registered, do you want to signin instead?",
          };
        let advDate = "04-March-2023";
        let posts = "34-Various-Posts";
        const { value: registration } =
          await registrationRequestSchema.findOneAndUpdate(
            { _id: fastify.mongo.ObjectId() },
            { $setOnInsert: toInsert },
            options
          );
        sendmail(
          {
            to: email,
            subject:
              "Verification Code of Online Application for Pune Cantonment Board, Pune (34 various posts)",
            text: `Your 6 digit email verification code for "Pune Cantonment Board, Pune, (Application for post of ${posts} and advertisement dated ${advDate})" is: 
               <span style="font-weight: bold">${verificationCode} </span>`,
          },
          registration
        );
        console.log(
          "looks like the email was also sent properly verificationId is:",
          registration.verificationId
        );
        return {
          error: 0,
          errorMsg: "",
          email,
          verificationId: registration.verificationId,
        };
      } catch (e) {
        fastify.log.error(`Error in inserting document ${JSON.stringify(e)}`);
        return reply
          .code(500)
          .send(
            "Internal error, unable to add registration request to database",
            e
          );
      }
    }
  );

  fastify.post(
    "/validateOTP",
    { schema: schemas.validateOTP },
    async function (request, reply) {
      let { email, verificationId, otp } = request.body;
      email = email.trim();
      verificationId = verificationId.trim();
      otp = otp.trim();

      let currentTime = DateTime.now();
      email = email.toLowerCase();
      console.log(
        `email verification : email: ${email} verificationId: ${verificationId} otp: ${otp}`
      );
      try {
        const query = {
          email,
          verificationId,
          verificationCode: otp,
        };
        console.log("query :", JSON.stringify(query));
        let found = await registrationRequestSchema.findOne(query);

        if (!found) {
          console.log("email verification failed");
          return { error: -1, errorMsg: "invalid Email otp" };
        }
        let validTill = DateTime.fromISO(found.validTill);
        if (currentTime > validTill)
          return reply.send({
            matched: false,
            error: -1,
            errorMsg: "Email otp is expired",
          });

        updateVerificationStatus(true, verificationId);
        return { error: 0, errorMsg: "" };
      } catch (e) {
        return { error: -1, errorMsg: "exception in processing validateOPT" };
      }
    }
  );

  fastify.post(
    "/loginAdmin",
    { schema: schemas.loginAdmin },
    async function (request, reply) {
      console.log("loginAdmin request received");
      let { login, password, captcha } = request.body;
      let currentTime = DateTime.now();
      try {
        console.log(`login${login} password:${password}`);
        let captchaRecord = await captchaSchema.findOne({ id: captcha.id });
        if (!captchaRecord)
          return {
            error: -1,
            errorMsg: "Invalid Captcha, not found in db",
            success: false,
          };
        let validTill = DateTime.fromISO(captchaRecord.validTill);
        if (currentTime > validTill)
          return { error: -1, errorMsg: "Captcha expired", success: false };
        if (captcha.text !== captchaRecord.text)
          return { error: -1, errorMsg: "Invalid Captcha", success: false };

        let user = await adminSchema.findOne({ login, password });
        console.log("admin user is:", JSON.stringify(user));
        if (!user)
          return {
            error: -1,
            errorMsg: "Invalid username or password",
            success: false,
          };

        const token = fastify.jwt.sign({ admin: login });
        return { error: 0, errorMsg: "", success: true, token };
      } catch (e) {
        console.log("error in loginAdmin", e);
        return reply.code(500).send("Internal error, unable to login admin");
      }
    }
  );

  fastify.post(
    "/loginReview",
    { schema: schemas.loginAdmin },
    async function (request, reply) {
      console.log("loginReviewrequest received");
      let { login, password, captcha } = request.body;
      let currentTime = DateTime.now();
      try {
        let captchaRecord = await captchaSchema.findOne({ id: captcha.id });
        if (!captchaRecord)
          return {
            error: -1,
            errorMsg: "Invalid Captcha, not found in db",
            success: false,
          };
        let validTill = DateTime.fromISO(captchaRecord.validTill);
        if (currentTime > validTill)
          return { error: -1, errorMsg: "Captcha expired", success: false };
        if (captcha.text !== captchaRecord.text)
          return { error: -1, errorMsg: "Invalid Captcha", success: false };

        let user = await reviewSchema.findOne({ login, password });
        console.log("admin user is:", JSON.stringify(user));
        if (!user)
          return {
            error: -1,
            errorMsg: "Invalid username or password",
            success: false,
          };

        const token = fastify.jwt.sign({ admin: login });
        return { error: 0, errorMsg: "", success: true, token };
      } catch (e) {
        console.log("error in loginAdmin", e);
        return reply.code(500).send("Internal error, unable to login admin");
      }
    }
  );

  fastify.post(
    "/loginCenterUser",
    { schema: schemas.loginCenterUser },
    async function (request, reply) {
      console.log("loginCenterUser received");
      let { login, password } = request.body;
      try {
        let user = await centerUserSchema.findOne({ login, password });
        console.log("center user is:", JSON.stringify(user));
        if (!user)
          return {
            error: -1,
            errorMsg: "Invalid username or password",
            success: false,
          };

        const token = fastify.jwt.sign({ centerUser: login });
        return { error: 0, errorMsg: "", success: true, token };
      } catch (e) {
        console.log("error in loginCenterUser", e);
        return reply
          .code(500)
          .send("Internal error, unable to login center user");
      }
    }
  );

  fastify.post(
    "/sendMobileVerificationCode",
    { schema: schemas.mobileVerificationCode },
    async function (request, reply) {
      try {
        console.log("send mobile Token");
        let d = new Date();
        let { mobile } = request.body;
        console.log("mobile no is", mobile);
        let verificationCode = (
          (Math.floor(Math.random() * 1000) + d.getTime()) %
          1000000
        )
          .toString()
          .padStart(6, "0");
        console.log("verification", verificationCode);

        let mobileRegistrationRequests = {
          ...request.body,
          verificationId: uuid(),
          verificationCode,
          validTill: DateTime.now()
            .plus({ minutes: 5 })
            .setZone("Asia/Calcutta")
            .toISO(),
        };
        console.log("mobile Register request", mobileRegistrationRequests);

        const toInsert = mobileRegistrationRequests;
        const options = { upsert: true, returnDocument: "after" };
        const { value: registration } =
          await mobileRegistrationRequestsSchema.findOneAndUpdate(
            { _id: fastify.mongo.ObjectId() },
            { $setOnInsert: toInsert },
            options
          );
        console.log("registration ", registration);
        let { error, result } = await getMobileVerificationCode({
          mobile,
          verificationCode,
        });
        if (error == 900) {
          error = 0;
        }
        console.log("sendMobileVerification code result: ", result);

        return {
          error,
          errorMsg: "",
          mobileVerificationId: registration.verificationId,
        };
      } catch (e) {
        console.log("error in ", e);
        if (e.error && e.error != 900) {
          return reply.code(400).send({ error: e.error, errorMsg: e.errorMsg });
        }
        return reply.code(500).send("Internal Error", e);
      }
    }
  );

  fastify.post(
    "/validateMobileOTP",
    { schema: schemas.validateMobileOTP },
    async function (request, reply) {
      let { mobile, mobileVerificationId, otp } = request.body;
      mobileVerificationId = mobileVerificationId.trim();
      otp = otp.trim();
      console.log(
        `mobile verification : mobile: ${mobile} verificationId: ${mobileVerificationId} otp: ${otp}`
      );
      let verificationId = mobileVerificationId;
      try {
        let currentTime = DateTime.now();

        console.log("mobile verification", verificationId);

        let found = await mobileRegistrationRequestsSchema.findOne({
          mobile,
          verificationId,
          verificationCode: otp,
        });
        if (!found) {
          console.log("mobile verification failed");
          return { error: -1, errorMsg: "invalid Mobile otp" };
        }

        let validTill = DateTime.fromISO(found.validTill);
        if (currentTime > validTill)
          return reply.send({
            matched: false,
            error: -1,
            errorMsg: "Mobile otp is expired",
          });

        console.log("find in mobile", found);
        // if (!found) return { error: -1, errorMsg: 'invalid otp' }
        updateMobileStatus(true, verificationId);
        console.log("eadfjjsdfj");
        return { error: 0, errorMsg: "" };
      } catch (e) {
        return { error: -1, errorMsg: "exception in processing validateOPT" };
      }
    }
  );
};
