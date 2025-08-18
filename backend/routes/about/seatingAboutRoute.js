const seatingAboutController = require("../../controllers/about/seatingAboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/seating_about" });

route.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  seatingAboutController.createSeatingAbout
);

route.patch(
  "/",
  upload.single("image"),
  adminMiddleware,
  seatingAboutController.updateSeatingAbout
);

// route.get("/:_id", seatingAboutController.getAbout);

route.get("/", seatingAboutController.getSeatingAbout);

route.delete("/", adminMiddleware, seatingAboutController.deleteSeatingAbout);

module.exports = route;
