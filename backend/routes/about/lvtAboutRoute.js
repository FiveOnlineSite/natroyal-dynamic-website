const lvtAboutController = require("../../controllers/about/lvtAboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("lvt-about");

const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Image size should be max 500 KB" });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};


route.post(
  "/",
  adminMiddleware,
  handleUpload(uploadMedia.single("image")),
  lvtAboutController.createLvtAbout
);

route.patch(
  "/",
  handleUpload(uploadMedia.single("image")),
  adminMiddleware,
  lvtAboutController.updateLvtAbout
);

// route.get("/:_id", lvtAboutController.getAbout);

route.get("/", lvtAboutController.getLvtAbout);

route.delete("/", adminMiddleware, lvtAboutController.deleteLvtAbout);

module.exports = route;
