const clientsController = require("../../controllers/othercomponents/clientsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const createUpload = require("../../utils/s3Uploads");

const uploadMedia = createUpload("clients");

route.post(
  "/",
  uploadMedia.single("logo"),
  adminMiddleware,
  clientsController.createClient
);

route.patch(
  "/:_id",
  uploadMedia.single("logo"),
  adminMiddleware,
  clientsController.updateClient
);

route.get("/:_id", clientsController.getClient);

route.get("/", clientsController.getClients);

route.delete("/:_id", adminMiddleware, clientsController.deleteClient);

module.exports = route;
