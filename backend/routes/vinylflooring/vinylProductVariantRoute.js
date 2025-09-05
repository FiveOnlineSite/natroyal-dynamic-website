const VinylProductVariantController = require("../../controllers/vinylflooring/vinylProductVariantController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-product-variants");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  VinylProductVariantController.createVinylProductVariant
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  VinylProductVariantController.updateVinylProductVariant
);

route.get("/product/:name", VinylProductVariantController.getVinylProductVariantsByProductName);

route.get("/:_id", VinylProductVariantController.getVinylProductVariant);

route.get("/", VinylProductVariantController.getVinylProductVariants);

route.delete(
  "/:_id",
  adminMiddleware,
  VinylProductVariantController.deleteProductVariant
);

module.exports = route;
