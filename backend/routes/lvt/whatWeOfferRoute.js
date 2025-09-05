const whatWeOfferController = require("../../controllers/lvt/whatWeOfferController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("what-we-offer");

route.post(
  "/",
  uploadMedia.fields([
    { name: "image", maxCount: 10 },
    { name: "brochure", maxCount: 10 },
  ]),
  adminMiddleware,
  whatWeOfferController.createWhatWeOffer
);

route.patch(
  "/",
  uploadMedia.fields([
    { name: "image", maxCount: 10 },
    { name: "brochure", maxCount: 10 },
  ]),
  adminMiddleware,
  whatWeOfferController.updateWhatWeOffer
);

route.get("/", whatWeOfferController.getWhatWeOffer);

route.delete("/", adminMiddleware, whatWeOfferController.deleteWhatWeOffer);

module.exports = route;
