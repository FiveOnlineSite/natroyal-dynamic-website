const lvtFeaturesController = require("../../controllers/lvt/lvtFeatureController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("lvt-features");

route.post(
  "/",
  uploadMedia.single("icon"),
  adminMiddleware,
  lvtFeaturesController.createLvtFeature
);

route.patch(
  "/:_id",
  uploadMedia.single("icon"),
  adminMiddleware,
  lvtFeaturesController.updateLvtFeature
);

route.get("/:_id", lvtFeaturesController.getLvtFeature);

route.get("/", lvtFeaturesController.getLvtFeatures);

route.delete("/:_id", adminMiddleware, lvtFeaturesController.deleteLvtFeature);

module.exports = route;
