const plankSliderController = require("../../controllers/lvt/plankSliderController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("planks-slider");

route.post(
  "/",
  uploadMedia.fields([
    { name: "image", maxCount: 10 },
    { name: "qr", maxCount: 10 },
  ]),
  adminMiddleware,
  plankSliderController.createPlankSlider
);

route.patch(
  "/:_id",
  uploadMedia.fields([
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
