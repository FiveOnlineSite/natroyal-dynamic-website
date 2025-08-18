const buttonsController = require("../../controllers/vinylflooring/buttonsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "brochure") {
      cb(null, "uploads/vinyl_brochures"); 
    } else {
      cb(null, "uploads/temp"); 
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage });

route.post(
  "/",
  upload.fields([
  { name: "technical_specification", maxCount: 1 },
  { name: "brochure", maxCount: 1 }
    ]),
  adminMiddleware,
  buttonsController.createButton
);

route.patch( 
    "/",
upload.fields([
  { name: "technical_specification", maxCount: 1 },
  { name: "brochure", maxCount: 1 }
    ]),
  adminMiddleware,
  buttonsController.updateButton
);

route.get("/", buttonsController.getButton);

// route.get("/", buttonsController.getButtons);

route.delete("/", adminMiddleware, buttonsController.deleteButton);

module.exports = route;
