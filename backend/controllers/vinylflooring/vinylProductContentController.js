const VinylProductContentModel = require("../../models/vinylflooring/vinylProductContentModel");
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const mongoose = require("mongoose");

const createVinylProductContent = async (req, res) => {
  try {
    const { title1, title2, content } = req.body;

    const { product } = req.body;
    console.log("product id", product, typeof product);

    const productExists = await VinylProductModel.findById(product);

    if (!productExists) {
      return res.status(400).json({ message: "Product not found" });
    }

    const existingContent = await VinylProductContentModel.findOne({ product });
    if (existingContent) {
      return res.status(400).json({
        message:
          "Content for this product already exists. Please update it instead of adding a new one.",
      });
    }

    const newVinylProductContent = new VinylProductContentModel({
      title1,
      title2,
      content,
      product,
    });

    await newVinylProductContent.save();

    return res.status(200).json({
      message: "Added VinylProductContent content successfully.",
      newVinylProductContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in adding VinylProductContent content due to ${error.message}`,
    });
  }
};

const updateVinylProductContent = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title1, title2, content, product } = req.body;

    const currentVinylProductContent = await VinylProductContentModel.findById(
      _id
    );
    if (!currentVinylProductContent) {
      return res
        .status(404)
        .json({ message: "VinylProductContent content not found." });
    }

    if (product) {
      // Check if valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const productExists = await VinylProductModel.findById(product);
      if (!productExists) {
        return res.status(400).json({ message: "Product not found" });
      }

      const duplicate = await VinylProductContentModel.findOne({
        product: product,
        _id: { $ne: _id },
      });

      if (duplicate) {
        return res.status(400).json({
          message:
            "Product content already exists for this Product. Please use a different Product or update the existing content.",
        });
      }
    }

    const updatedFields = {
      title1,
      title2,
      content,
      product,
    };

    const updatedVinylProductContent =
      await VinylProductContentModel.findByIdAndUpdate(_id, updatedFields, {
        new: true,
      });

    return res.status(200).json({
      message: "VinylProductContent content updated successfully.",
      updatedVinylProductContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating VinylProductContent content due to ${error.message}`,
    });
  }
};

const getVinylProductContentByProductName = async (req, res) => {
  try {
    let productName = req.params.name.replace(/-/g, " "); // "education" or "royal-star"

     const contents = await VinylProductContentModel.find().populate("product");

    const productContent = contents.filter(content =>
      content.product?.name?.toLowerCase() === productName.toLowerCase()
    );

    if (!productContent || productContent.length === 0) {
      return res.status(404).json({ message: "No productContent found for this product" });
    }

    res.status(200).json({
      message: "productContent fetched by product successfully",
      productContent
    });
  } catch (err) {
    console.error("Error fetching vinyl productContent by product name:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getVinylProductContent = async (req, res) => {
  try {
    const productContent = await VinylProductContentModel.findById(
      req.params._id
    );

    if (!productContent) {
      return res.status(400).json({
        message: "No productContent is created. Kindly create one.",
      });
    }

    const populatedContent = await VinylProductContentModel.findById(
      req.params._id
    ).populate("product");

    if (!populatedContent) {
      return res.status(400).json({
        message: "No productContent is created. Kindly create one.",
      });
    }

    return res.status(200).json({
      message: "productContent fetched successfully.",
      productContent: populatedContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching productContent due to ${error.message}`,
    });
  }
};

const getVinylProductContents = async (req, res) => {
  try {
    const VinylProductContent = await VinylProductContentModel.find().populate(
      "product",
      "name"
    );

    if (VinylProductContent.length === 0) {
      return res.status(400).json({
        message: "VinylProductContent content not added. Kindly add content.",
      });
    }
    return res.status(200).json({
      message: "VinylProductContent content fetched successfully.",
      count: VinylProductContent.length,
      VinylProductContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching VinylProductContent content due to ${error.message}`,
    });
  }
};

const deleteVinylProductContent = async (req, res) => {
  try {
    const VinylProductContentContent = await VinylProductContentModel.findOne(
      {}
    );

    if (VinylProductContentContent.length === 0) {
      return res.status(400).json({
        message:
          "No VinylProductContent content added to delete. Kindly add one.",
      });
    }

    const deletedVinylProductContent =
      await VinylProductContentModel.findByIdAndDelete(
        VinylProductContentContent._id
      );

    return res.status(200).json({
      message: "VinylProductContent content deleted successfully.",
      deletedVinylProductContent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting VinylProductContent content due to ${error.message}`,
    });
  }
};

module.exports = {
  createVinylProductContent,
  updateVinylProductContent,
  getVinylProductContentByProductName,
  getVinylProductContent,
  getVinylProductContents,
  deleteVinylProductContent,
};
