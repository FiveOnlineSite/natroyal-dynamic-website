const coatedFeaturesController = require("../../controllers/features/coatedFeaturesController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/coated_features_icons" });

route.post(
  "/",
  upload.single("icon"),
  adminMiddleware,
  coatedFeaturesController.createCoatedFeature
);

route.patch(
  "/:_id",
  upload.single("icon"),
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
