const coatedAppController = require("../../controllers/coatedfabrics/coatedAppController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/coated_applications" });

route.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    next();
  },
  adminMiddleware,
  coatedAppController.createCoatedApp
);

route.patch(
  "/:_id",
  upload.single("image"),
  adminMiddleware,
  coatedAppController.updateCoatedApp
);

route.get("/:_id", coatedAppController.getCoatedApp);

route.get("/", coatedAppController.getCoatedApps);

route.delete("/:_id", adminMiddleware, coatedAppController.deleteCoatedApp);

module.exports = route;
