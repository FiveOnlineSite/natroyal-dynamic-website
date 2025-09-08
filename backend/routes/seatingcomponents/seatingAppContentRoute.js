const seatingAppContentController = require("../../controllers/seatingcomponents/seatingAppContentController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post(
  "/",
  adminMiddleware,
  seatingAppContentController.createSeatingAppContent
);

route.patch(
  "/:_id",
  adminMiddleware,
  seatingAppContentController.updateSeatingAppContent
);

route.get("/application/:name", seatingAppContentController.getSeatingAppContentByAppName);

route.get("/:_id", seatingAppContentController.getSeatingAppContent);

route.get("/", seatingAppContentController.getSeatingAppContents);

route.delete(
  "/:_id",
  adminMiddleware,
  seatingAppContentController.deleteSeatingAppContent
);

module.exports = route;
