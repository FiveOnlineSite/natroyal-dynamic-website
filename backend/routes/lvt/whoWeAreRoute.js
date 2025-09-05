const whoWeAreController = require("../../controllers/lvt/whoWeAreController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("who-we-are");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  whoWeAreController.createWhoWeAre
);

route.patch(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  whoWeAreController.updateWhoWeAre
);

route.get("/", whoWeAreController.getWhoWeAre);

route.delete("/", adminMiddleware, whoWeAreController.deleteWhoWeAre);

module.exports = route;
