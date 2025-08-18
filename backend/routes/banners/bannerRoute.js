const bannerController = require("../../controllers/banners/bannerController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/banners" });

route.post(
  "/",
  upload.single("banner"),
  adminMiddleware,
  bannerController.createBanner
);

route.patch(
  "/:_id",
  upload.single("banner"),
  adminMiddleware,
  bannerController.updateBanner
);

route.get("/:_id", bannerController.getBanner);

route.get("/", bannerController.getBanners);

route.delete("/:_id", adminMiddleware, bannerController.deleteBanner);

module.exports = route;
