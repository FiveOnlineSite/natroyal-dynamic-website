const aboutController = require("../../controllers/about/aboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post("/", adminMiddleware, aboutController.createAbout);

route.patch("/", adminMiddleware, aboutController.updateAbout);

// route.get("/:_id", aboutController.getAbout);

route.get("/", aboutController.getAbout);

route.delete("/", adminMiddleware, aboutController.deleteAbout);

module.exports = route;
