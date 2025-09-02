const vinylProductController = require("../../controllers/vinylflooring/vinylProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_products" });

route.post(
  "/",
   upload.single("image"),
  adminMiddleware,
  vinylProductController.createVinylProduct
);

route.patch(
  "/:_id",
  upload.single("image"),
  adminMiddleware,
  vinylProductController.updateVinylProduct
);

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
