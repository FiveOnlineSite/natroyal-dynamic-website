const bannerController = require("../../controllers/banners/bannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
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

// Dynamic storage based on file type
const createUpload = () =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        // Determine folder based on MIME type
        let folder = "public/images/banners"; // default
        if (file.mimetype.startsWith("video/")) {
          folder = "public/videos/banners";
        }

        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, `${folder}/${filename}`);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });

// Routes
route.post(
  "/",
  createUpload().single("banner"),
  adminMiddleware,
  bannerController.createBanner
);

route.patch(
  "/:_id",
  createUpload().single("banner"),
  adminMiddleware,
  bannerController.updateBanner
);


route.get("/:_id", bannerController.getBanner);

route.get("/", bannerController.getBanners);

route.delete("/:_id", adminMiddleware, bannerController.deleteBanner);

module.exports = route;
