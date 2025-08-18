const eventsController = require("../../controllers/lvt/eventsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/events" });

route.post(
  "/",
  upload.array("youtube_thumbnail", 10),
  adminMiddleware,
  eventsController.createEvent
);

route.patch("/", upload.any(), adminMiddleware, eventsController.updateEvent);

route.get("/:eventId", eventsController.getSingleEvent);

route.get("/", eventsController.getEvent);

route.delete("/:eventId", adminMiddleware, eventsController.deleteSingleEvent);

route.delete("/", adminMiddleware, eventsController.deleteEvent);

module.exports = route;
