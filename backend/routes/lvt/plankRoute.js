const plankController = require("../../controllers/lvt/plankController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("plank-brochure");

route.post(
  "/",
  uploadMedia.single("brochure"),
  adminMiddleware,
  plankController.createPlank
);

route.patch(
  "/",
  uploadMedia.single("brochure"),
  adminMiddleware,
  plankController.updatePlank
);

route.get("/", plankController.getPlank);

route.delete("/", adminMiddleware, plankController.deletePlank);

module.exports = route;
