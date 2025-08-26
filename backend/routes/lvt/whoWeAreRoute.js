const whoWeAreController = require("../../controllers/lvt/whoWeAreController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/who_we_are" });

route.post(
  "/",
  upload.single("image"),
  adminMiddleware,
  whoWeAreController.createWhoWeAre
);

route.patch(
  "/",
  upload.single("image"),
  adminMiddleware,
  whoWeAreController.updateWhoWeAre
);

route.get("/", whoWeAreController.getWhoWeAre);

route.delete("/", adminMiddleware, whoWeAreController.deleteWhoWeAre);

module.exports = route;
