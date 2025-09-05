const seatingProductController = require("../../controllers/seatingcomponents/seatingProductController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/seating_products" });

route.post(
  "/",
  upload.single("image"),
  adminMiddleware,
  seatingProductController.createSeatingProduct
);

route.patch(
  "/:_id",
  upload.single("image"),
  adminMiddleware,
  seatingProductController.updateSeatingProduct
);

route.get("/:_id", seatingProductController.getSeatingProduct);

route.get("/", seatingProductController.getSeatingProducts);

route.delete(
  "/:_id",
  adminMiddleware,
  seatingProductController.deleteSeatingProduct
);

module.exports = route;
