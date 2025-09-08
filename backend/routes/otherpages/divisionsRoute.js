const divisionsController = require("../../controllers/otherpages/divisionsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("divisions");

route.post(
  "/",
  uploadMedia.fields([
    { name: "image", maxCount: 10 },
    { name: "logo", maxCount: 10 },
  ]),
  adminMiddleware,
  divisionsController.createDivision
);

route.patch(
  "/:_id",
  uploadMedia.fields([
    { name: "image", maxCount: 10 },
    { name: "logo", maxCount: 10 },
  ]),
  adminMiddleware,
  divisionsController.updateDivision
);

route.get("/:_id", divisionsController.getDivision);

route.get("/", divisionsController.getDivisions);

route.delete("/:_id", adminMiddleware, divisionsController.deleteDivision);

module.exports = route;
