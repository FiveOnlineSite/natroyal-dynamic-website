const lvtFeaturesController = require("../../controllers/features/lvtFeaturesController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/lvt_features_icons" });

route.post(
  "/",
  upload.single("icon"),
  adminMiddleware,
  lvtFeaturesController.createLvtFeature
);

route.patch(
  "/:_id",
  upload.single("icon"),
  adminMiddleware,
  lvtFeaturesController.updateLvtFeature
);

route.get("/:_id", lvtFeaturesController.getLvtFeature);

route.get("/", lvtFeaturesController.getLvtFeatures);

route.delete("/:_id", adminMiddleware, lvtFeaturesController.deleteLvtFeature);

module.exports = route;
