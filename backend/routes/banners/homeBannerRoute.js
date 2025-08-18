const homeBannerController = require("../../controllers/banners/homeBannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/home_banners" });

route.post(
  "/",
  upload.single("banner"),
  adminMiddleware,
  homeBannerController.createHomeBanner
);

route.patch(
  "/:_id",
  upload.single("banner"),
  adminMiddleware,
  homeBannerController.updateHomeBanner
);

route.get("/:_id", homeBannerController.getHomeBanner);

route.get("/", homeBannerController.getHomeBanners);

route.delete("/:_id", adminMiddleware, homeBannerController.deleteHomeBanner);

module.exports = route;
