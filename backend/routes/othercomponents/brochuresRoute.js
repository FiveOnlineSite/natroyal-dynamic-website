const brochuresController = require("../../controllers/othercomponents/brochuresController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/brochures");
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
  brochuresController.createBrochure
);

route.patch(
  "/:_id",
  upload.single("brochure"),
  adminMiddleware,
  brochuresController.updateBrochure
);

route.get("/:_id", brochuresController.getBrochure);

route.get("/", brochuresController.getBrochures);

route.delete("/:_id", adminMiddleware, brochuresController.deleteBrochure);

module.exports = route;
