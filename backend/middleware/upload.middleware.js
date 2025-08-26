// upload.js
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
//  * Create multer upload middleware
//  * @param {"public" | "private"} accessType - whether file is public or private
//  * @param {"images" | "videos" | "pdfs"} fileType - type of file
//  * @param {string} dynamicFolder - custom folder name inside type
//  */

const createUpload = (accessType, fileType, dynamicFolder) =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: accessType === "public" ? "public-read" : "private", // control ACL
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        let basePath = `${accessType}/${fileType}/${dynamicFolder}`;
        cb(null, `${basePath}/${Date.now()}-${file.originalname}`);
      },
    }),
    limits: {
      fileSize: 20 * 1024 * 1024, // 20 MB
    },
  });

module.exports = createUpload;
