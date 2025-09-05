const VinylProductVariantController = require("../../controllers/vinylflooring/vinylProductVariantController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
<<<<<<< HEAD
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-product-variants");

route.post(
  "/",
  uploadMedia.single("image"),
=======
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_product_variants" });

route.post(
  "/",
  upload.array("image", 10),
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  adminMiddleware,
  VinylProductVariantController.createVinylProductVariant
);

route.patch(
  "/:_id",
<<<<<<< HEAD
  uploadMedia.single("image"),
=======
  upload.array("image", 10),
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  adminMiddleware,
  VinylProductVariantController.updateVinylProductVariant
);

<<<<<<< HEAD
route.get("/product/:name", VinylProductVariantController.getVinylProductVariantsByProductName);

=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
route.get("/:_id", VinylProductVariantController.getVinylProductVariant);

route.get("/", VinylProductVariantController.getVinylProductVariants);

route.delete(
  "/:_id",
  adminMiddleware,
  VinylProductVariantController.deleteProductVariant
);

module.exports = route;
