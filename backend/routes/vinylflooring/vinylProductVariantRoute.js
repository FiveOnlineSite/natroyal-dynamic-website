const VinylProductVariantController = require("../../controllers/vinylflooring/vinylProductVariantController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_product_variants" });

route.post(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  VinylProductVariantController.createVinylProductVariant
);

route.patch(
  "/:_id",
  upload.array("image", 10),
  adminMiddleware,
  VinylProductVariantController.updateVinylProductVariant
);

route.get("/:_id", VinylProductVariantController.getVinylProductVariant);

route.get("/", VinylProductVariantController.getVinylProductVariants);

route.delete(
  "/:_id",
  adminMiddleware,
  VinylProductVariantController.deleteProductVariant
);

module.exports = route;
