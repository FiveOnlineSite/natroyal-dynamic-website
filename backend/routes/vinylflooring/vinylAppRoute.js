const vinylAppController = require("../../controllers/vinylflooring/vinylAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
<<<<<<< HEAD
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-applications");

route.post(
  "/",
  uploadMedia.fields([
=======
const multer = require("multer");

const upload = multer({ dest: "uploads/vinyl_applications" });

route.post(
  "/",
  upload.fields([
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
    { name: "image", maxCount: 1},
    { name: "icon", maxCount: 1 },
  ]),
  adminMiddleware,
  vinylAppController.createVinylApp
);

route.patch(
  "/:_id",
<<<<<<< HEAD
  uploadMedia.fields([
=======
  upload.fields([
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
    { name: "image", maxCount: 1},
    { name: "icon", maxCount: 1 },
  ]),
  adminMiddleware,
  vinylAppController.updateVinylApp
);

<<<<<<< HEAD
route.get("/name/:name", vinylAppController.getVinylAppByName);

=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
route.get("/:_id", vinylAppController.getVinylApp);

route.get("/", vinylAppController.getAllVinylApps);


route.delete("/:_id", adminMiddleware, vinylAppController.deleteVinylApp);

module.exports = route;
