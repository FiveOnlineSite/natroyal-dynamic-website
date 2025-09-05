const suitableController = require("../../controllers/vinylflooring/suitableController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("suitables");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  suitableController.createSuitable
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  suitableController.updateSuitable
);

route.get("/:_id", suitableController.getSuitable);

route.get("/", suitableController.getSuitables);

route.delete("/:_id", adminMiddleware, suitableController.deleteSuitable);

module.exports = route;
