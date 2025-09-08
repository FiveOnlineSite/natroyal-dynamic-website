const coatedFeaturesController = require("../../controllers/coatedfabrics/coatedFeatureController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("coated-features");

route.post(
  "/",
  uploadMedia.single("icon"),
  adminMiddleware,
  coatedFeaturesController.createCoatedFeature
);

route.patch(
  "/:_id",
  uploadMedia.single("icon"),
  adminMiddleware,
  coatedFeaturesController.updateCoatedFeature
);

route.get("/:_id", coatedFeaturesController.getCoatedFeature);

route.get("/", coatedFeaturesController.getCoatedFeatures);

route.delete(
  "/:_id",
  adminMiddleware,
  coatedFeaturesController.deleteCoatedFeature
);

module.exports = route;
