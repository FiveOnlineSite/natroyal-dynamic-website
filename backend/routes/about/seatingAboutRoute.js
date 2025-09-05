const seatingAboutController = require("../../controllers/about/seatingAboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("seating-about");

route.post(
  "/",
  adminMiddleware,
  uploadMedia.single("image"),
  seatingAboutController.createSeatingAbout
);

route.patch(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  seatingAboutController.updateSeatingAbout
);

// route.get("/:_id", seatingAboutController.getAbout);

route.get("/", seatingAboutController.getSeatingAbout);

route.delete("/", adminMiddleware, seatingAboutController.deleteSeatingAbout);

module.exports = route;
