const suitableController = require("../../controllers/vinylflooring/suitableController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/suitable" });

route.post(
  "/",
  upload.single("image"),
  adminMiddleware,
  suitableController.createSuitable
);

route.patch(
  "/:_id",
  upload.single("image"),
  adminMiddleware,
  suitableController.updateSuitable
);

route.get("/:_id", suitableController.getSuitable);

route.get("/", suitableController.getSuitables);

route.delete("/:_id", adminMiddleware, suitableController.deleteSuitable);

module.exports = route;
