const vinylAppContentController = require("../../controllers/vinylflooring/vinylAppContentController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post(
  "/",
  adminMiddleware,
  vinylAppContentController.createVinylAppContent
);

route.patch(
  "/:_id",
  adminMiddleware,
  vinylAppContentController.updateVinylAppContent
);

route.get("/:_id", vinylAppContentController.getVinylAppContent);

route.get("/", vinylAppContentController.getVinylAppContents);

route.delete("/:_id", adminMiddleware, vinylAppContentController.deleteVinylAppContent);

module.exports = route;
