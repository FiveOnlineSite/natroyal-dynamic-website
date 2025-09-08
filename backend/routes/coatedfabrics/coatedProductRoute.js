const coatedProductController = require("../../controllers/coatedfabrics/coatedProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("coated-products");

route.post(
  "/",
  uploadMedia.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
  ]),
  adminMiddleware,
  coatedProductController.createCoatedProduct
);

route.patch(
  "/:_id",
  uploadMedia.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
  ]),
  adminMiddleware,
  coatedProductController.updateCoatedProduct
);

route.get("/application/:name", coatedProductController.getCoatedProductByAppName);

route.get("/:_id", coatedProductController.getCoatedProduct);

route.get("/", coatedProductController.getCoatedProducts);

route.delete(
  "/:_id",
  adminMiddleware,
  coatedProductController.deleteCoatedProduct
);

module.exports = route;
