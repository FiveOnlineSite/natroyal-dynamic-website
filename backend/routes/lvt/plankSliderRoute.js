const plankSliderController = require("../../controllers/lvt/plankSliderController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/planks" });

route.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "qr", maxCount: 10 },
  ]),
  adminMiddleware,
  plankSliderController.createPlankSlider
);

route.patch(
  "/:_id",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "qr", maxCount: 10 },
  ]),
  adminMiddleware,
  plankSliderController.updatePlankSlider
);

route.get("/:_id", plankSliderController.getPlankSlider);

route.get("/", plankSliderController.getPlankSliders);

route.delete("/:_id", adminMiddleware, plankSliderController.deletePlankSlider);

module.exports = route;
