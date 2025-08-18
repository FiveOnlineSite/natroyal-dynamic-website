const seatingAppController = require("../../controllers/seatingcomponents/seatingAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/seating_applications" });

route.post(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  seatingAppController.createSeatingApp
);

route.patch(
  "/",
  upload.array("image", 10),
  adminMiddleware,
  seatingAppController.updateSeatingApp
);

route.get("/:applicationId", seatingAppController.getSingleSeatingApp);

route.get("/", seatingAppController.getSeatingApp);

route.delete(
  "/:applicationId",
  adminMiddleware,
  seatingAppController.deleteSingleApp
);

route.delete("/", adminMiddleware, seatingAppController.deleteSeatingApp);

module.exports = route;
