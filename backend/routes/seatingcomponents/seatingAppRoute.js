const seatingAppController = require("../../controllers/seatingcomponents/seatingAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("seating-applications");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  seatingAppController.createSeatingApp
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  seatingAppController.updateSeatingApp
);

route.get("/:_id", seatingAppController.getSeatingApp);

route.get("/", seatingAppController.getSeatingApps);

route.delete("/:_id", adminMiddleware, seatingAppController.deleteSeatingApp);

module.exports = route;
