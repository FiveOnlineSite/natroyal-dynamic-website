const lvtAboutController = require("../../controllers/about/lvtAboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("lvt-about");

route.post(
  "/",
  adminMiddleware,
  uploadMedia.single("image"),
  lvtAboutController.createLvtAbout
);

route.patch(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  lvtAboutController.updateLvtAbout
);

// route.get("/:_id", lvtAboutController.getAbout);

route.get("/", lvtAboutController.getLvtAbout);

route.delete("/", adminMiddleware, lvtAboutController.deleteLvtAbout);

module.exports = route;
