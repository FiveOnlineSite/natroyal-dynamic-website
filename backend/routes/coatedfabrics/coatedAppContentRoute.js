const coatedAppContentController = require("../../controllers/coatedfabrics/coatedAppContentController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post(
  "/",
  adminMiddleware,
  coatedAppContentController.createCoatedAppContent
);

route.patch(
  "/:_id",
  adminMiddleware,
  coatedAppContentController.updateCoatedAppContent
);

route.get("/application/:name", coatedAppContentController.getCoatedAppContentByAppName);

route.get("/:_id", coatedAppContentController.getCoatedAppContent);

route.get("/", coatedAppContentController.getCoatedAppContents);

route.delete(
  "/:_id",
  adminMiddleware,
  coatedAppContentController.deleteCoatedAppContent
);

module.exports = route;
