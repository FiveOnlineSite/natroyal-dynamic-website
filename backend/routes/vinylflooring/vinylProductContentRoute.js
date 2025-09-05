const vinylProductContentController = require("../../controllers/vinylflooring/vinylProductContentController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post(
  "/",
  adminMiddleware,
  vinylProductContentController.createVinylProductContent
);

route.patch(
  "/:_id",
  adminMiddleware,
  vinylProductContentController.updateVinylProductContent
);

route.get("/product/:name", vinylProductContentController.getVinylProductContentByProductName);

route.get("/:_id", vinylProductContentController.getVinylProductContent);

route.get("/", vinylProductContentController.getVinylProductContents);

route.delete("/:_id", adminMiddleware, vinylProductContentController.deleteVinylProductContent);

module.exports = route;
