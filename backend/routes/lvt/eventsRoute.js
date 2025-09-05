const eventsController = require("../../controllers/lvt/eventsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("events");

route.post(
  "/",
  uploadMedia.array("youtube_thumbnail", 10),
  adminMiddleware,
  eventsController.createEvent
);

route.patch("/", uploadMedia.any(), adminMiddleware, eventsController.updateEvent);

route.get("/:eventId", eventsController.getSingleEvent);

route.get("/", eventsController.getEvent);

route.delete("/:eventId", adminMiddleware, eventsController.deleteSingleEvent);

route.delete("/", adminMiddleware, eventsController.deleteEvent);

module.exports = route;
