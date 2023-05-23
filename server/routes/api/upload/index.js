"use strict";
const { DateTime } = require("luxon");
const path = require("path");
const multer = require("fastify-multer");
const S3 = require("aws-sdk/clients/s3");
const multerS3 = require("multer-s3");
const uniqid = require("uniqid");
const { doesNotMatch } = require("assert");
const fs = require('fs');
const request = require('request');

const bucketName = "pcb01uploads";
const region = "ap-south-1";
const accessKeyId = "AKIASBOROETZ2N5PRX4X";
const secretAccessKey = "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";
const {finalprint} = require('../../../report/image')

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

let storageS3 = multerS3({
  s3: s3,
  bucket: bucketName,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    //cb(null, `${req.user.login}-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    cb(
      null,
      `${file.fieldname}-${uniqid()}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});
// register fastify content parser
const createImagePdf = ({ filename }) => {
  let aPromise = new Promise((resolve, reject) => {

    let imagesrc = `https://pcb01uploads.s3.ap-south-1.amazonaws.com/${filename}`;
    let imagedest = `report/downloads/${filename}`;
    console.log('imagesrc', imagesrc)
    console.log('imagedest', imagedest)
    download(imagesrc, imagedest, async () => {
      console.log("before finalprint")
      let document = ''
      try {
        document = await finalprint({ filename });
        fs.unlink(document, (err) => {
          if (err) console.log('error in deleting the pdfgenerated: ', document)
        })
        resolve('success')
        console.log('document', document)
      } catch (e) {
        reject(e)
        console.log('error in finalprint', e)
      }
      console.log("after finalprint document is: ", document)

      console.log("final print doc created", document)
      fs.unlink(imagedest, (err) => {
        if (err) console.log('error in deleting the temp signfile: ', imagedest)
      })
      // fs.unlink(document, (e) => { })
    })
  });
  return aPromise
}

module.exports = async function (fastify, opts) {
  fastify.register(multer.contentParser);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../../uploads_new/"));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${req.user.login}-${file.fieldname}-${Date.now()}${path.extname(
          file.originalname
        )}`
      );
    },
  });

  const imageFilter = function (req, file, cb) {
    if (
      !file.originalname.match(
        // /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG|webp|WEBP)$/
        /\.(jpg|JPG|jpeg|JPEG)$/
      )
    ) {
      req.fileValidationError = "Only jpeg files are allowed!";
      return cb(new Error("Only jpeg files are allowed!"), false);
    }
    cb(null, true);
  };

  const imageFilterPdf = function (req, file, cb) {
    if (
      !file.originalname.match(
        // /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG|webp|WEBP)$/
        /\.(pdf|PDF)$/
      )
    ) {
      req.fileValidationError = "Only pdf files are allowed!";
      return cb(new Error("Only pdf files are allowed!"), false);
    }
    cb(null, true);
  };

  const limitsUpload = {
    fileSize: 1024 * 200, // 200 kb
    files: 1,
  };
  const limitsUploadPdf = {
    fileSize: 1024 * 1024, // 1 mb.
    files: 1,
  };

  const upload = multer({
    // storage: storage,
    storage: storageS3,
    dest: "uploads/",
    fileFilter: imageFilterPdf,
    limits: limitsUploadPdf,
  }).single("upload_file");

  const uploadPhotoSign = multer({
    //storage: storage,
    storage: storageS3,
    dest: "uploads/",
    fileFilter: imageFilter,
    limits: limitsUpload,
  }).single("upload_file");

  const deleteFile = async ({ uploadedFile, email }) => {
    console.log("delete file called uploadedFile is:", uploadedFile);
    let applicationSchema = fastify.mongo.db.collection("applications");
    let index = 0;
    let filename = "";
    try {
      const filter = { "personalInfo.email": email };
      let updateRec = {};
      updateRec[`uploads.${uploadedFile}`] = "";
      let updateDoc = { $set: updateRec };
      await applicationSchema.updateOne(filter, updateDoc);
    } catch (e) {
      console.log("unable to delete file /upload/deleteFile", e);
    }
  };

  const updateRecordV2 = async ({ request, tag, filename, index = 0 } = {}) => {
    let applicationSchema = fastify.mongo.db.collection("applications");
    try {
      const filter = { "personalInfo.email": request.user.login };
      let updateDoc;
      let prop = `uploads.${tag}`;
      let updateRec = {};
      updateRec[prop] = filename;
      updateDoc = { $set: updateRec };
      await applicationSchema.updateOne(filter, updateDoc);
    } catch (e) {
      console.log("exception in update Record :", e);
    }
  };

  fastify.post(
    "/uploadFile/:tag",
    {
      preValidation: [fastify.authenticate],
      preHandler: [
        (request, reply, done) => {
          let { tag } = request.params
          console.log('prehandler called')
          if (tag == "photo" || tag == "sign") return uploadPhotoSign(request, reply, done)
          return upload(request, reply, done)
        },
      ]
    },
    async function (request, reply) {
      console.log("inside uploadFile");
      try {
        let { tag } = request.body;
        if (tag == 'photo' || tag == 'sign') {
          try {
            let imageValid = await createImagePdf({ request, filename: request.file.key })
            console.log('error is ...', imageValid)
          } catch (e) {
            return reply.code(400).send({
              message: "your image format is not acceptable, please change your image and uploaded again",
            });
          }
        }

        await updateRecordV2({
          request,
          tag,
          filename: request.file.key,
          index: Number(request.body.index),
        });
        return reply.code(200).send({ filename: request.file.key });
      } catch (e) {
        console.log("upload file returned with exception: ", e);
        reply.code(500).send({
          message: e + "exception in handling upload/uploadFile",
        });
      }
    }
  );

  fastify.post(
    "/deleteFile",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        let { uploadedFile } = request.body;
        const email = request.user.login;
        await deleteFile({ email, uploadedFile });
        return reply.code(200).send({ error: 0, errorMsg: "" });
      } catch (e) {
        reply.code(500).send({ message: e + "exception in upload/deleteFile" });
      }
    }
  );
  // end
};
