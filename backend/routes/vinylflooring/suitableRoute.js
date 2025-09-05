const suitableController = require("../../controllers/vinylflooring/suitableController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
<<<<<<< HEAD
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("suitables");

route.post(
  "/",
  uploadMedia.single("image"),
=======
const multer = require("multer");

const upload = multer({ dest: "uploads/suitable" });

route.post(
  "/",
  upload.single("image"),
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  adminMiddleware,
  suitableController.createSuitable
);

route.patch(
  "/:_id",
<<<<<<< HEAD
  uploadMedia.single("image"),
=======
  upload.single("image"),
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  adminMiddleware,
  suitableController.updateSuitable
);

route.get("/:_id", suitableController.getSuitable);

route.get("/", suitableController.getSuitables);

route.delete("/:_id", adminMiddleware, suitableController.deleteSuitable);

module.exports = route;
