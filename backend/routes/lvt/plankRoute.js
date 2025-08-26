const plankController = require("../../controllers/lvt/plankController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/plank_brochure");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post(
  "/",
  upload.single("brochure"),
  adminMiddleware,
  plankController.createPlank
);

route.patch(
  "/",
  upload.single("brochure"),
  adminMiddleware,
  plankController.updatePlank
);

route.get("/", plankController.getPlank);

route.delete("/", adminMiddleware, plankController.deletePlank);

module.exports = route;
