const bannerController = require("../../controllers/banners/bannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("banners");

// Routes
route.post(
  "/",
  adminMiddleware,
  uploadMedia.single("banner"),
  bannerController.createBanner
);

route.patch(
  "/:_id",
  adminMiddleware,
  uploadMedia.single("banner"),
  bannerController.updateBanner
);

route.get("/all-pages", bannerController.getPagesForBanner);

route.get("/page/*", bannerController.getBannerByPage);

route.get("/:_id", bannerController.getBanner);

route.get("/", bannerController.getBanners);

route.delete("/:_id", adminMiddleware, bannerController.deleteBanner);

module.exports = route;
