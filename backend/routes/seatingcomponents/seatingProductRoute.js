const seatingProductController = require("../../controllers/seatingcomponents/seatingProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/seating_products" });

route.post(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  seatingProductController.createSeatingProduct
);

route.patch(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  seatingProductController.updateSeatingProduct
);

route.get("/:productId", seatingProductController.getSingleSeatingProduct);

route.get("/", seatingProductController.getSeatingProduct);

route.delete(
  "/:productId",
  adminMiddleware,
  seatingProductController.deleteSingleProduct
);

route.delete(
  "/",
  adminMiddleware,
  seatingProductController.deleteSeatingProduct
);

module.exports = route;
