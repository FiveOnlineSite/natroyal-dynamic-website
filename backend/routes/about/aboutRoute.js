const aboutController = require("../../controllers/about/aboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("about");

const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Video size should be max 10 MB" });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

route.post("/", handleUpload(uploadMedia.single("video")), adminMiddleware, aboutController.createAbout);

route.patch("/", handleUpload(uploadMedia.single("video")), adminMiddleware, aboutController.updateAbout);

// route.get("/:_id", aboutController.getAbout);

route.get("/", aboutController.getAbout);

route.delete("/", adminMiddleware, aboutController.deleteAbout);

module.exports = route;
