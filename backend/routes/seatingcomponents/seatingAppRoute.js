const seatingAppController = require("../../controllers/seatingcomponents/seatingAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/seating_applications" });

route.post(
  "/",
  upload.single("image"),
  adminMiddleware,
  seatingAppController.createSeatingApp
);

route.patch(
  "/:_id",
  upload.single("image"),
  adminMiddleware,
  seatingAppController.updateSeatingApp
);

route.get("/:_id", seatingAppController.getSeatingApp);

route.get("/", seatingAppController.getSeatingApps);

route.delete("/:_id", adminMiddleware, seatingAppController.deleteSeatingApp);

module.exports = route;
