const whatWeOfferController = require("../../controllers/lvt/whatWeOfferController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const brochureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/offer_brochure");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: brochureStorage,
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image and PDF files are allowed"));
    }
  },
});

route.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "brochure", maxCount: 10 },
  ]),
  adminMiddleware,
  whatWeOfferController.createWhatWeOffer
);

route.patch(
  "/",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "brochure", maxCount: 10 },
  ]),
  adminMiddleware,
  whatWeOfferController.updateWhatWeOffer
);

route.get("/", whatWeOfferController.getWhatWeOffer);

route.delete("/", adminMiddleware, whatWeOfferController.deleteWhatWeOffer);

module.exports = route;
