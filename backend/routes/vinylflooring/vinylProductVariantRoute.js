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
  "/",
  upload.array("image", 10),
  adminMiddleware,
  VinylProductVariantController.updateVinylProductVariant
);

route.get("/:variantId", VinylProductVariantController.getSingleVinylProductVariant);

route.get("/", VinylProductVariantController.getVinylProductVariant);

route.delete(
  "/:variantId",
  adminMiddleware,
  VinylProductVariantController.deleteSingleProductVariant
);

route.delete("/", adminMiddleware, VinylProductVariantController.deleteVinylProductVariant);

module.exports = route;
