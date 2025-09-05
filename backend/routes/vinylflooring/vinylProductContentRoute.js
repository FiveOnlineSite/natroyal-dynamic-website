const vinylProductContentController = require("../../controllers/vinylflooring/vinylProductContentController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post(
  "/",
  adminMiddleware,
  vinylProductContentController.createVinylProductContent
);

route.patch(
  "/:_id",
  adminMiddleware,
  vinylProductContentController.updateVinylProductContent
);

<<<<<<< HEAD
route.get("/product/:name", vinylProductContentController.getVinylProductContentByProductName);

=======
>>>>>>> 721728c22a7a9d42ff6a0a1641aae72537001e60
route.get("/:_id", vinylProductContentController.getVinylProductContent);

route.get("/", vinylProductContentController.getVinylProductContents);

route.delete("/:_id", adminMiddleware, vinylProductContentController.deleteVinylProductContent);

module.exports = route;
