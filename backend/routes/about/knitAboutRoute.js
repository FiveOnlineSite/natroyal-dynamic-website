const knitAboutController = require("../../controllers/about/knitAboutController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post("/", adminMiddleware, knitAboutController.createKnitAbout);

route.patch("/", adminMiddleware, knitAboutController.updateKnitAbout);

// route.get("/:_id", knitAboutController.getAbout);

route.get("/", knitAboutController.getKnitAbout);

route.delete("/", adminMiddleware, knitAboutController.deleteKnitAbout);

module.exports = route;
