const seatingProductController = require("../../controllers/seatingcomponents/seatingProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("seating-products");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  seatingProductController.createSeatingProduct
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  seatingProductController.updateSeatingProduct
);

route.get("/application/:name", seatingProductController.getSeatingProductByAppName);

route.get("/app-product", seatingProductController.getSeatingAppAndProduct);

route.get("/:_id", seatingProductController.getSeatingProduct);

route.get("/", seatingProductController.getSeatingProducts);

route.delete(
  "/:_id",
  adminMiddleware,
  seatingProductController.deleteSeatingProduct
);

module.exports = route;
