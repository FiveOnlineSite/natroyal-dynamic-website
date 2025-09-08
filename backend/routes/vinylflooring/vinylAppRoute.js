const vinylAppController = require("../../controllers/vinylflooring/vinylAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-applications");

route.post(
  "/",
  uploadMedia.fields([
    { name: "image", maxCount: 1},
    { name: "icon", maxCount: 1 },
  ]),
  adminMiddleware,
  vinylAppController.createVinylApp
);

route.patch(
  "/:_id",
  uploadMedia.fields([
    { name: "image", maxCount: 1},
    { name: "icon", maxCount: 1 },
  ]),
  adminMiddleware,
  vinylAppController.updateVinylApp
);

route.get("/app-product/", vinylAppController.getVinylAppAndProduct);

route.get("/name/:name", vinylAppController.getVinylAppByName);

route.get("/:_id", vinylAppController.getVinylApp);

route.get("/", vinylAppController.getAllVinylApps);

route.delete("/:_id", adminMiddleware, vinylAppController.deleteVinylApp);

module.exports = route;
