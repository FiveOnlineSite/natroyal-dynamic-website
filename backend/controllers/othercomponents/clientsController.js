const clientsModel = require("../../models/othercomponents/clientsModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");

const createClient = async (req, res) => {
  try {
    const { logo, alt } = req.body;

    let logoData = {};

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "An image file is required for the logo field.",
      });
    }

    // Check logo extension
    const extname = path.extname(file.originalname).toLowerCase();
    const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
    if (!isImage) {
      return res.status(400).json({
        message:
          "Unsupported image type. Please upload a .webp, .jpg, or .png logo.",
      });
    }

    logoData = {
                  filename: path.basename(file.key), // "1756968423495-2.jpg"
                  filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                };

    const newClient = new clientsModel({
      logo: logoData,
      alt,
    });

    await newClient.save();

    return res.status(200).json({
      message: "Client added successfully.",
      newClient,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error adding client: ${error.message}`,
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const { logo, alt } = req.body;

    const currentClient = await clientsModel.findById(req.params._id);

    if (!currentClient) {
      return res.status(404).json({ message: "Client not found." });
    }

    const file = req.file;

    const updatedFields = {};

    if (file) {
      const fileExtensionName = path.extname(file.originalname).toLowerCase();

      const allowedExtensions = [".webp", ".png", ".jpg", ".jpeg"];

      if (!allowedExtensions.includes(fileExtensionName)) {
        return res.status(400).json({
          message:
            "Unsupported image type. Please upload a .webp, .png, .jpg, or .jpeg logo.",
        });
      }

      const logoData =  {
                  filename: path.basename(file.key), // "1756968423495-2.jpg"
                  filepath: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}` // keep "images/banners/..."
                };


      updatedFields.logo = logoData;
    } else {
      // Preserve the existing logo if no new file uploaded
      updatedFields.logo = currentClient.logo;
    }

    if (alt) updatedFields.alt = alt;

    const updatedClient = await clientsModel.findByIdAndUpdate(
      currentClient._id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Client updated successfully.",
      updatedClient,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating client due to ${error.message || error}`,
    });
  }
};

const getClient = async (req, res) => {
  try {
    const client = await clientsModel.findById(req.params._id);

    if (!client) {
      return res.status(400).json({
        message: "No client is created. Kindly create one.",
      });
    }
    return res.status(200).json({
      message: "Client fetched successfully.",
      client,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching client due to ${error.message}`,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await clientsModel.find();

    if (clients.length === 0) {
      return res.status(400).json({
        message: "Client not created. Kindly create client.",
      });
    }
    return res.status(200).json({
      message: "Clients fetched successfully.",
      count: clients.length,
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching client due to ${error.message}`,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await clientsModel.findById({
      _id: req.params._id,
    });

    if (client.length === 0) {
      return res.status(400).json({
        message: "No client added to delete. Kindly add one.",
      });
    }

    const deletedClient = await clientsModel.findByIdAndDelete(client._id);

    return res.status(200).json({
      message: "Client deleted successfully.",
      deletedClient,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting client due to ${error.message}`,
    });
  }
};

module.exports = {
  createClient,
  updateClient,
  getClient,
  getClients,
  deleteClient,
};
