const plankCategoryController = require("../../controllers/lvt/plankCategoryController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();

route.post("/", adminMiddleware, plankCategoryController.createPlankCategory);

route.patch(
  "/:_id",
  adminMiddleware,
  plankCategoryController.updatePlankCategory
);

route.get("/:_id", plankCategoryController.getPlankCategory);

route.get("/", plankCategoryController.getPlankCategories);

route.delete(
  "/:_id",
  adminMiddleware,
  plankCategoryController.deletePlankCategory
);

module.exports = route;
