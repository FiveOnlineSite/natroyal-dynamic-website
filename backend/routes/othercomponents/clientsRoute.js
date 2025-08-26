const clientsController = require("../../controllers/othercomponents/clientsController");
const express = require("express");
const adminMiddleware = require("../../middleware/adminMiddleware");
const route = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/client_logos" });

route.post(
  "/",
  upload.single("logo"),
  adminMiddleware,
  clientsController.createClient
);

route.patch(
  "/:_id",
  upload.single("logo"),
  adminMiddleware,
  clientsController.updateClient
);

route.get("/:_id", clientsController.getClient);

route.get("/", clientsController.getClients);

route.delete("/:_id", adminMiddleware, clientsController.deleteClient);

module.exports = route;
