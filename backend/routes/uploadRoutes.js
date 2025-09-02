// const express = require("express");
// const router = express.Router();
// const createUpload = require("../middleware/upload.middleware");

// // Upload public images (dynamic folder: "banners")
// const uploadImages = createUpload("public", "images", "banners");
// router.post("/upload/image", uploadImages.single("file"), (req, res) => {
//   res.json({ url: req.file.location });
// });

// // Upload public videos (dynamic folder: "ads")
// const uploadVideos = createUpload("public", "videos", "ads");
// router.post("/upload/video", uploadVideos.single("file"), (req, res) => {
//   res.json({ url: req.file.location });
// });

// // Upload private PDFs (dynamic folder: "reports")
// const uploadPDFs = createUpload("private", "pdfs", "reports");
// router.post("/upload/pdf", uploadPDFs.single("file"), (req, res) => {
//   res.json({ key: req.file.key }); // won't be public
// });

// module.exports = router;
