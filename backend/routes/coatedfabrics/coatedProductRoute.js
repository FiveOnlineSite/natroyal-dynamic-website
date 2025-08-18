const coatedProductController = require("../../controllers/coatedfabrics/coatedProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/coated_products" });

route.post(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  coatedProductController.createCoatedProduct
);

route.patch(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  coatedProductController.updateCoatedProduct
);

route.get("/:productId", coatedProductController.getSingleCoatedProduct);

route.get("/", coatedProductController.getCoatedProduct);

route.delete(
  "/:productId",
  adminMiddleware,
  coatedProductController.deleteSingleProduct
);

route.delete("/", adminMiddleware, coatedProductController.deleteCoatedProduct);

module.exports = route;
