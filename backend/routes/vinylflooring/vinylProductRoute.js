const vinylProductController = require("../../controllers/vinylflooring/vinylProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
<<<<<<< HEAD
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-products");

route.post(
  "/",
   uploadMedia.single("image"),
=======
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_products" });

route.post(
  "/",
   upload.single("image"),
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  adminMiddleware,
  vinylProductController.createVinylProduct
);

route.patch(
  "/:_id",
<<<<<<< HEAD
  uploadMedia.single("image"),
=======
  upload.single("image"),
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
  adminMiddleware,
  vinylProductController.updateVinylProduct
);

<<<<<<< HEAD
route.get("/application/:name", vinylProductController.getVinylProductsByAppName);

=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
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
