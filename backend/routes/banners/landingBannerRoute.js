const landingBannerController = require("../../controllers/banners/landingBannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("landing-banners");

route.post(
  "/",
  uploadMedia.single("banner"),
  adminMiddleware,
  landingBannerController.createLandingBanner
);

route.patch(
  "/:_id",
  uploadMedia.single("banner"),
  adminMiddleware,
  landingBannerController.updateLandingBanner
);

route.get("/page/:page", landingBannerController.getLandingBannerByPage);

route.get("/:_id", landingBannerController.getLandingBanner);

route.get("/", landingBannerController.getLandingBanners);

route.delete(
  "/:_id",
  adminMiddleware,
  landingBannerController.deleteLandingBanner
);

module.exports = route;
