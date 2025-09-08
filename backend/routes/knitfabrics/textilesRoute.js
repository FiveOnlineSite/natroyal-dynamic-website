const textilesController = require("../../controllers/knitfabrics/textilesController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("textiles");

route.post(
  "/",
  uploadMedia.single("image"),
  adminMiddleware,
  textilesController.createTextile
);

route.patch(
  "/:_id",
  uploadMedia.single("image"),
  adminMiddleware,
  textilesController.updateTextile
);

route.get("/with-tags", textilesController.getTextilesWithTags);

route.get("/:_id", textilesController.getTextile);

route.get("/", textilesController.getTextiles);

route.delete("/:_id", adminMiddleware, textilesController.deleteTextile);

module.exports = route;
