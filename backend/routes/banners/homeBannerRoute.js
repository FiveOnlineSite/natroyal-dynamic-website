const homeBannerController = require("../../controllers/banners/homeBannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("home-banners");

route.post(
  "/",
  uploadMedia.single("banner"),
  adminMiddleware,
  homeBannerController.createHomeBanner
);

route.patch(
  "/:_id",
  uploadMedia.single("banner"),
  adminMiddleware,
  homeBannerController.updateHomeBanner
);

route.get("/:_id", homeBannerController.getHomeBanner);

route.get("/", homeBannerController.getHomeBanners);

route.delete("/:_id", adminMiddleware, homeBannerController.deleteHomeBanner);

module.exports = route;
