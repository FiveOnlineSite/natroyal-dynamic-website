const landingBannerController = require("../../controllers/banners/landingBannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/landing_banners" });

route.post(
  "/",
  upload.single("banner"),
  adminMiddleware,
  landingBannerController.createLandingBanner
);

route.patch(
  "/:_id",
  upload.single("banner"),
  adminMiddleware,
  landingBannerController.updateLandingBanner
);

route.get("/:_id", landingBannerController.getLandingBanner);

route.get("/", landingBannerController.getLandingBanners);

route.delete(
  "/:_id",
  adminMiddleware,
  landingBannerController.deleteLandingBanner
);

module.exports = route;
