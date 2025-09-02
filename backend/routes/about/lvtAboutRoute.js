const lvtAboutController = require("../../controllers/about/lvtAboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/lvt_about" });

route.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  lvtAboutController.createLvtAbout
);

route.patch(
  "/",
  upload.single("image"),
  adminMiddleware,
  lvtAboutController.updateLvtAbout
);

// route.get("/:_id", lvtAboutController.getAbout);

route.get("/", lvtAboutController.getLvtAbout);

route.delete("/", adminMiddleware, lvtAboutController.deleteLvtAbout);

module.exports = route;
