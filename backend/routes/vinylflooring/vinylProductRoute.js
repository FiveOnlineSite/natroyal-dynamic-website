const vinylProductController = require("../../controllers/vinylflooring/vinylProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_products" });

route.post(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  vinylProductController.createVinylProduct
);

route.patch(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  vinylProductController.updateVinylProduct
);

route.get("/:productId", vinylProductController.getSingleVinylProduct);

route.get("/", vinylProductController.getVinylProduct);

route.delete(
  "/:applicationId",
  adminMiddleware,
  vinylProductController.deleteProductApplication
);


route.delete(
  "/:productId",
  adminMiddleware,
  vinylProductController.deleteSingleProduct
);

route.delete(
  "/",
  adminMiddleware,
  vinylProductController.deleteVinylProduct
);

module.exports = route;
