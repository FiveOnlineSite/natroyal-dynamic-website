const vinylAppController = require("../../controllers/vinylflooring/vinylAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/coated_applicaitons" });

route.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "icon", maxCount: 10 },
  ]),
  adminMiddleware,
  vinylAppController.createVinylApp
);

route.patch(
  "/",
 upload.any(),
  adminMiddleware,
  vinylAppController.updateVinylApp
);

route.get("/:applicationId", vinylAppController.getSingleVinylApp);

route.get("/", vinylAppController.getVinylApp);

route.delete(
  "/:applicationId",
  adminMiddleware,
  vinylAppController.deleteSingleApp
);

route.delete("/", adminMiddleware, vinylAppController.deleteVinylApp);

module.exports = route;
