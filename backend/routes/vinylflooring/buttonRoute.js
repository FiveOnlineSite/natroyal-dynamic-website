const buttonsController = require("../../controllers/vinylflooring/buttonsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("vinyl-buttons");

route.post(
  "/",
  uploadMedia.fields([
  { name: "technical_specification", maxCount: 1 },
  { name: "brochure", maxCount: 1 }
    ]),
  adminMiddleware,
  buttonsController.createButton
);

route.patch( 
    "/",
uploadMedia.fields([
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
