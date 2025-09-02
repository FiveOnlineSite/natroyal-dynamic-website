const tagsController = require("../../controllers/knitfabrics/tagsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post("/", adminMiddleware, tagsController.createTag);

route.patch("/:_id", adminMiddleware, tagsController.updateTag);

route.get("/:_id", tagsController.getTag);

route.get("/", tagsController.getTags);

route.delete("/:_id", adminMiddleware, tagsController.deleteTag);

module.exports = route;
