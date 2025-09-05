const aboutController = require("../../controllers/about/aboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("about");

route.post("/", uploadMedia.single("video"), adminMiddleware, aboutController.createAbout);

route.patch("/", uploadMedia.single("video"), adminMiddleware, aboutController.updateAbout);

// route.get("/:_id", aboutController.getAbout);

route.get("/", aboutController.getAbout);

route.delete("/", adminMiddleware, aboutController.deleteAbout);

module.exports = route;
