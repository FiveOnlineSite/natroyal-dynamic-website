const vinylProductController = require("../../controllers/vinylflooring/vinylProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-products");

route.post(
  "/",
   uploadMedia.single("image"),
  adminMiddleware,
  vinylProductController.createVinylProduct
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  vinylProductController.updateVinylProduct
);

route.get("/application/:name", vinylProductController.getVinylProductsByAppName);

route.get("/:_id", vinylProductController.getVinylProduct);

route.get("/", vinylProductController.getVinylProducts);

route.delete(
  "/:_id",
  adminMiddleware,
  vinylProductController.deleteVinylProduct
);

// route.delete(
//   "/",
//   adminMiddleware,
//   vinylProductController.deleteVinylProduct
// );

module.exports = route;
