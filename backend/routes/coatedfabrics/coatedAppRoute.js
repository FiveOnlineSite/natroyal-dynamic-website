const coatedAppController = require("../../controllers/coatedfabrics/coatedAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("coated-applications");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  coatedAppController.createCoatedApp
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  coatedAppController.updateCoatedApp
);

route.get("/:_id", coatedAppController.getCoatedApp);

route.get("/", coatedAppController.getCoatedApps);

route.delete("/:_id", adminMiddleware, coatedAppController.deleteCoatedApp);

module.exports = route;
