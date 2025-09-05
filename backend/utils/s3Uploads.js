const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3Client } = require("../config/s3");

/**
 * Create dynamic upload middleware
 * @param {string} dynamicFolder - Subfolder name (e.g. banners, services, projects)
 */
const createUpload = (dynamicFolder) =>
  multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: "public-read", // make files public
       contentType: multerS3.AUTO_CONTENT_TYPE, 
      key: (req, file, cb) => {
        let folder = `images/${dynamicFolder}`;
        if (file.mimetype.startsWith("image/")) {
          folder = `images/${dynamicFolder}`;
        } else if (file.mimetype.startsWith("video/")) {
          folder = `videos/${dynamicFolder}`;
        } else if (file.mimetype === "application/pdf") {
          folder = `pdfs/${dynamicFolder}`;   
        }

        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, `${folder}/${filename}`);
      },
    }),
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
    },
  });

module.exports = createUpload; 
