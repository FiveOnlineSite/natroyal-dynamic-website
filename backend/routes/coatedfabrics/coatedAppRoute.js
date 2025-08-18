const coatedAppController = require("../../controllers/coatedfabrics/coatedAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/coated_applications" });

route.post(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  coatedAppController.createCoatedApp
);

route.patch(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  coatedAppController.updateCoatedApp
);

route.get("/:applicationId", coatedAppController.getSingleCoatedApp);

route.get("/", coatedAppController.getCoatedApp);

route.delete(
  "/:applicationId",
  adminMiddleware,
  coatedAppController.deleteSingleApp
);

route.delete("/", adminMiddleware, coatedAppController.deleteCoatedApp);

module.exports = route;
