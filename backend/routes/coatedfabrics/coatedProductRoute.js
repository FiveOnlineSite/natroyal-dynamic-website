const coatedProductController = require("../../controllers/coatedfabrics/coatedProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "brochure") {
      cb(null, "uploads/coated_products_brochures");
    } else {
      cb(null, "uploads/temp");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

route.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
  ]),
  adminMiddleware,
  coatedProductController.createCoatedProduct
);

route.patch(
  "/:_id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
  ]),
  adminMiddleware,
  coatedProductController.updateCoatedProduct
);

route.get("/:_id", coatedProductController.getCoatedProduct);

route.get("/", coatedProductController.getCoatedProducts);

route.delete(
  "/:_id",
  adminMiddleware,
  coatedProductController.deleteCoatedProduct
);

module.exports = route;
