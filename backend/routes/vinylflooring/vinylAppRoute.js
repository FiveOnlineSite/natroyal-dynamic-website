const vinylAppController = require("../../controllers/vinylflooring/vinylAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_applications" });

route.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1},
    { name: "icon", maxCount: 1 },
  ]),
  adminMiddleware,
  vinylAppController.createVinylApp
);

route.patch(
  "/:_id",
  upload.fields([
    { name: "image", maxCount: 1},
    { name: "icon", maxCount: 1 },
  ]),
  adminMiddleware,
  vinylAppController.updateVinylApp
);

route.get("/:_id", vinylAppController.getVinylApp);

route.get("/", vinylAppController.getAllVinylApps);


route.delete("/:_id", adminMiddleware, vinylAppController.deleteVinylApp);

module.exports = route;
