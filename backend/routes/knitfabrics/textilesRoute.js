const textilesController = require("../../controllers/knitfabrics/textilesController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/textiles" });

route.post(
  "/",
  upload.single("image"),
  adminMiddleware,
  textilesController.createTextile
);

route.patch(
  "/:_id",
  upload.single("image"),
  adminMiddleware,
  textilesController.updateTextile
);

route.get("/:_id", textilesController.getTextile);

route.get("/", textilesController.getTextiles);

route.delete("/:_id", adminMiddleware, textilesController.deleteTextile);

module.exports = route;
