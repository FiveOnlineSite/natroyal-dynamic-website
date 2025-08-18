// const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
// const cloudinary = require("../../utils/cloudinary");
// const path = require("path");
// const fs = require("fs");
// const mongoose = require("mongoose");

// const createVinylApp = async (req, res) => {
//   try {
//     const { yellow_title, black_title } = req.body;
//     const applicationData = JSON.parse(req.body.application);

//     const imageFiles = req.files?.image || [];
//     const iconFiles = req.files?.icon || [];

//     if (
//       !Array.isArray(applicationData) ||
//       applicationData.length === 0 ||
//       imageFiles.length !== applicationData.length ||
//       iconFiles.length !== applicationData.length
//     ) {
//       return res.status(400).json({
//         message: "Each application must have a corresponding image and icon.",
//       });
//     }

//     const uploadedApplication = [];

//     for (let i = 0; i < applicationData.length; i++) {
//       const application = applicationData[i];
//       const imageFile = imageFiles[i];
//       const iconFile = iconFiles[i];

//       const validExt = [".jpg", ".jpeg", ".png", ".webp"];
//       const imageExt = path.extname(imageFile.originalname).toLowerCase();
//       const iconExt = path.extname(iconFile.originalname).toLowerCase();

//       if (!validExt.includes(imageExt) || !validExt.includes(iconExt)) {
//         return res.status(400).json({
//           message: `Invalid file type for image or icon at index ${i}.`,
//         });
//       }

//       const [imageUpload, iconUpload] = await Promise.all([
//         cloudinary.uploader.upload(imageFile.path, {
//           folder: "vinyl_applications/images",
//           resource_type: "image",
//         }),
//         cloudinary.uploader.upload(iconFile.path, {
//           folder: "vinyl_applications/icons",
//           resource_type: "image",
//         }),
//       ]);

//       // Clean up
//       [imageFile, iconFile].forEach((file) => {
//         const filePath = path.resolve(file.path);
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       });

//       uploadedApplication.push({
//         image: [
//           {
//             filename: imageUpload.original_filename,
//             filepath: imageUpload.secure_url,
//           },
//         ],
//         icon: [
//           {
//             filename: iconUpload.original_filename,
//             filepath: iconUpload.secure_url,
//           },
//         ],
//         alt: application.alt || "",
//         icon_alt: application.icon_alt || "",
//         name: application.name || "",
//         content: application.content || "",
//         link: application.link || "",
//       });
//     }

//     const newVinylApplication = new VinylApplicationModel({
//       yellow_title,
//       black_title,
//       application: uploadedApplication,
//     });

//     await newVinylApplication.save();

//     return res.status(201).json({
//       message: "Vinyl application created successfully",
//       newVinylApplication,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error creating vinyl application: ${error.message}`,
//     });
//   }
// };

// const updateVinylApp = async (req, res) => {
//   try {
//     const { yellow_title, black_title } = req.body;

//     let applicationData = [];

//     if (req.body.application && req.body.application !== "undefined") {
//       try {
//         applicationData = JSON.parse(req.body.application);
//       } catch (err) {
//         return res
//           .status(400)
//           .json({ message: "Invalid JSON in application field." });
//       }
//     }

//     const currentVinylApplication = await VinylApplicationModel.findOne({});

//     if (!currentVinylApplication) {
//       return res.status(404).json({ message: "Application not found." });
//     }

//     const files = req.files;

//     const imageFiles = files?.image || [];
//     const iconFiles = files?.icon || [];

//     const uploadedApplication = [];
//     const modifiedApplication = [];

//     for (let i = 0; i < applicationData.length; i++) {
//       const application = applicationData[i];
//       const imageFile = imageFiles[i];
//       const iconFile = iconFiles[i];

//       let imageData;
//       let iconData;

//       if (imageFile) {
//         const extname = path.extname(imageFile.originalname).toLowerCase();
//         const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
//         if (!isImage) {
//           return res.status(400).json({
//             message: `Unsupported image type for image: ${imageFile.originalname}`,
//           });
//         }

//         const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
//           folder: "vinyl_applications/images",
//           resource_type: "image",
//         });

//         fs.unlinkSync(path.resolve(imageFile.path));

//         imageData = [
//           {
//             filename: uploadResult.original_filename,
//             filepath: uploadResult.secure_url,
//           },
//         ];
//       }

//       if (iconFile) {
//         const extname = path.extname(iconFile.originalname).toLowerCase();
//         const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
//         if (!isImage) {
//           return res.status(400).json({
//             message: `Unsupported image type for icon: ${iconFile.originalname}`,
//           });
//         }

//         const uploadResult = await cloudinary.uploader.upload(iconFile.path, {
//           folder: "vinyl_applications/icons",
//           resource_type: "image",
//         });

//         fs.unlinkSync(path.resolve(iconFile.path));

//         iconData = [
//           {
//             filename: uploadResult.original_filename,
//             filepath: uploadResult.secure_url,
//           },
//         ];
//       }

//       if (application._id) {
//         const existingIndex = currentVinylApplication.application.findIndex(
//           (a) => a._id.toString() === application._id
//         );

//         if (existingIndex !== -1) {
//           const existingApplication =
//             currentVinylApplication.application[existingIndex];

//           currentVinylApplication.application[existingIndex] = {
//             image: imageData ?? existingApplication.image,
//             alt: application.alt ?? existingApplication.alt,
//             icon: iconData ?? existingApplication.icon,
//             icon_alt: application.icon_alt ?? existingApplication.icon_alt,
//             name: application.name ?? existingApplication.name,
//             link: application.link ?? existingApplication.link,
//             content: application.content ?? existingApplication.content,
//             _id: existingApplication._id,
//           };

//           modifiedApplication.push(
//             currentVinylApplication.application[existingIndex]
//           );
//         }
//       } else {
//         const newApplication = {
//           image: imageData || [],
//           alt: application.alt || "",
//           icon: iconData || [],
//           icon_alt: application.icon_alt,
//           content: application.content,
//           name: application.name || "",
//           link: application.link || "",
//         };
//         uploadedApplication.push(newApplication);
//         modifiedApplication.push(newApplication);
//       }
//     }

//     const updatedFields = {
//       yellow_title,
//       black_title: black_title ?? currentVinylApplication.black_title,
//       application: [
//         ...(currentVinylApplication.application || []),
//         ...uploadedApplication,
//       ],
//     };

//     await VinylApplicationModel.findByIdAndUpdate(
//       currentVinylApplication._id,
//       updatedFields,
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Vinyl application updated successfully.",
//       modifiedApplication,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in updating vinyl application due to ${
//         error.message || error
//       }`,
//     });
//   }
// };

// const getSingleVinylApp = async (req, res) => {
//   try {
//     const { applicationId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(applicationId)) {
//       return res.status(400).json({ message: "Invalid applicationId" });
//     }

//     const vinylApp = await VinylApplicationModel.findOne({
//       "application._id": new mongoose.Types.ObjectId(applicationId),
//     });

//     if (!vinylApp) {
//       return res.status(404).json({
//         message: "Application not found in any vinyl application document.",
//       });
//     }

//     const matchedApp = vinylApp.application.find(
//       (a) => a._id.toString() === applicationId
//     );

//     if (!matchedApp) {
//       return res
//         .status(404)
//         .json({ message: "Application not found in array." });
//     }

//     return res.status(200).json({
//       message: "Vinyl application fetched successfully.",
//       application: matchedApp,
//       // parentAppId: vinylApp._id,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in fetching vinyl application due to ${error.message}`,
//     });
//   }
// };

// const getVinylApp = async (req, res) => {
//   try {
//     const vinylApp = await VinylApplicationModel.find();

//     if (vinylApp.length === 0) {
//       return res.status(400).json({
//         message: "Application not added. Kindly add one.",
//       });
//     }

//     const totalApps = vinylApp.reduce(
//       (acc, doc) => acc + (doc.application?.length || 0),
//       0
//     );

//     return res.status(200).json({
//       message: "Vinyl applications fetched successfully.",
//       applicationCount: totalApps,
//       vinylApp,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in fetching vinyl applications due to ${error.message}`,
//     });
//   }
// };

// const deleteSingleApp = async (req, res) => {
//   try {
//     const { applicationId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(applicationId)) {
//       return res.status(400).json({ message: "Invalid applicationId" });
//     }

//     const vinylApp = await VinylApplicationModel.findOne({
//       "application._id": applicationId,
//     });

//     if (!vinylApp) {
//       return res.status(404).json({
//         message: "App not found in any vinyl application.",
//       });
//     }

//     const deletedVinylApp = vinylApp.application.find(
//       (a) => a._id.toString() === applicationId
//     );

//     if (!deletedVinylApp) {
//       return res.status(404).json({
//         message: "Application not found in the array.",
//       });
//     }

//     const updatedVinylApp = await VinylApplicationModel.findByIdAndUpdate(
//       vinylApp._id,
//       {
//         $pull: { application: { _id: applicationId } },
//       },
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Vinyl application deleted successfully.",
//       deletedVinylApp,
//       updatedVinylApp,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in deleting vinyl application: ${error.message}`,
//     });
//   }
// };

// const deleteVinylApp = async (req, res) => {
//   try {
//     const vinylApp = await VinylApplicationModel.findOne({});

//     if (vinylApp.length === 0) {
//       return res.status(400).json({
//         message: "No vinyl application added to delete. Kindly add one.",
//       });
//     }

//     const deletedVinylApp = await VinylApplicationModel.findByIdAndDelete(
//       vinylApp._id
//     );

//     return res.status(200).json({
//       message: "Vinyl application deleted successfully.",
//       deletedVinylApp,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in deleting vinyl application due to ${error.message}`,
//     });
//   }
// };

// module.exports = {
//   createVinylApp,
//   updateVinylApp,
//   getSingleVinylApp,
//   getVinylApp,
//   deleteSingleApp,
//   deleteVinylApp,
// };

const VinylApplicationModel = require("../../models/vinylflooring/vinylAppModel");
const VinylProductModel = require("../../models/vinylflooring/vinylProductModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createVinylApp = async (req, res) => {
  try {
    const { yellow_title, black_title } = req.body;
    const applicationData = JSON.parse(req.body.application);

    const imageFiles = req.files?.image || [];
    const iconFiles = req.files?.icon || [];

    if (
      !Array.isArray(applicationData) ||
      applicationData.length === 0 ||
      imageFiles.length !== applicationData.length ||
      iconFiles.length !== applicationData.length
    ) {
      return res.status(400).json({
        message: "Each application must have a corresponding image and icon.",
      });
    }

    const uploadedApplication = [];

    for (let i = 0; i < applicationData.length; i++) {
      const application = applicationData[i];
      const imageFile = imageFiles[i];
      const iconFile = iconFiles[i];

      const validExt = [".jpg", ".jpeg", ".png", ".webp"];
      const imageExt = path.extname(imageFile.originalname).toLowerCase();
      const iconExt = path.extname(iconFile.originalname).toLowerCase();

      if (!validExt.includes(imageExt) || !validExt.includes(iconExt)) {
        return res.status(400).json({
          message: `Invalid file type for image or icon at index ${i}.`,
        });
      }

      const [imageUpload, iconUpload] = await Promise.all([
        cloudinary.uploader.upload(imageFile.path, {
          folder: "vinyl_applications/images",
          resource_type: "image",
        }),
        cloudinary.uploader.upload(iconFile.path, {
          folder: "vinyl_applications/icons",
          resource_type: "image",
        }),
      ]);

      [imageFile, iconFile].forEach((file) => {
        const filePath = path.resolve(file.path);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      uploadedApplication.push({
        image: [
          {
            filename: imageUpload.original_filename,
            filepath: imageUpload.secure_url,
          },
        ],
        icon: [
          {
            filename: iconUpload.original_filename,
            filepath: iconUpload.secure_url,
          },
        ],
        alt: application.alt || "",
        icon_alt: application.icon_alt || "",
        name: application.name,
        content: application.content || "",
        link: application.link || "",
      });
    }

    const newVinylApplication = new VinylApplicationModel({
      yellow_title,
      black_title,
      application: uploadedApplication,
    });

    await newVinylApplication.save();

    return res.status(201).json({
      message: "Vinyl application created successfully",
      newVinylApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating vinyl application: ${error.message}`,
    });
  }
};

const updateVinylApp = async (req, res) => {
  try {
    const { yellow_title, black_title } = req.body;

    let applicationData = [];
    if (req.body.application && req.body.application !== "undefined") {
      try {
        applicationData = JSON.parse(req.body.application);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Invalid JSON in application field." });
      }
    }

    const currentVinylApplication = await VinylApplicationModel.findOne({});
    if (!currentVinylApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    const files = req.files || [];
    const fileMap = {};
    for (const file of files) {
      fileMap[file.fieldname] = file;
    }

    const existingAppsMap = new Map();
    currentVinylApplication.application.forEach((app) => {
      existingAppsMap.set(app._id.toString(), app);
    });

    const updatedApplications = [];

    for (let i = 0; i < applicationData.length; i++) {
      const appData = applicationData[i];

      const imageFile = fileMap[`image_${i}`];
      const iconFile = fileMap[`icon_${i}`];

      let imageData = [];
      if (imageFile) {
        const extname = path.extname(imageFile.originalname).toLowerCase();
        if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
          return res
            .status(400)
            .json({
              message: `Unsupported image type: ${imageFile.originalname}`,
            });
        }
        const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
          folder: "vinyl_applications/images",
          resource_type: "image",
        });
        imageData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];
        fs.unlinkSync(imageFile.path);
      }

      let iconData = [];
      if (iconFile) {
        const extname = path.extname(iconFile.originalname).toLowerCase();
        if (![".webp", ".jpg", ".jpeg", ".png"].includes(extname)) {
          return res
            .status(400)
            .json({
              message: `Unsupported image type: ${iconFile.originalname}`,
            });
        }
        const uploadResult = await cloudinary.uploader.upload(iconFile.path, {
          folder: "vinyl_applications/icons",
          resource_type: "image",
        });
        iconData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];
        fs.unlinkSync(iconFile.path);
      }

      if (appData._id && existingAppsMap.has(appData._id)) {

        const existingApp = existingAppsMap.get(appData._id);

        if (imageData.length > 0) existingApp.image = imageData;
        if (iconData.length > 0) existingApp.icon = iconData;

        if (typeof appData.alt !== "undefined") existingApp.alt = appData.alt;
        if (typeof appData.icon_alt !== "undefined")
          existingApp.icon_alt = appData.icon_alt;
        if (typeof appData.name !== "undefined")
          existingApp.name = appData.name;
        if (typeof appData.link !== "undefined")
          existingApp.link = appData.link;
        if (typeof appData.content !== "undefined")
          existingApp.content = appData.content;

        updatedApplications.push(existingApp);
        existingAppsMap.delete(appData._id);
      } else {

        const newApp = {
          image: imageData,
          icon: iconData,
          alt: appData.alt || "",
          icon_alt: appData.icon_alt || "",
          name: appData.name || "",
          link: appData.link || "",
          content: appData.content || "",
        };
        updatedApplications.push(newApp);
      }
    }

    for (const leftoverApp of existingAppsMap.values()) {
      updatedApplications.push(leftoverApp);
    }

    currentVinylApplication.application = updatedApplications;

    if (typeof black_title !== "undefined")
      currentVinylApplication.black_title = black_title;
    if (typeof yellow_title !== "undefined")
      currentVinylApplication.yellow_title = yellow_title;

    await currentVinylApplication.save();

    return res.status(200).json({
      message: "Vinyl application updated successfully.",
      modifiedApplication: updatedApplications,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating vinyl application due to ${
        error.message || error
      }`,
    });
  }
};

  const getSingleVinylApp = async (req, res) => {
    try {
      const { applicationId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        return res.status(400).json({ message: "Invalid applicationId" });
      }

      const vinylApp = await VinylApplicationModel.findOne().populate("applicati");

      if (!vinylApp) {
        return res.status(404).json({
          message: "Application not found in any vinyl application document.",
        });
      }

      const matchedApp = vinylApp.application.find(
        (a) => a._id.toString() === applicationId
      );


      if (!matchedApp) {
        return res
          .status(404)
          .json({ message: "Application not found in array." });
      }

      return res.status(200).json({
        message: "Vinyl application fetched successfully.",
        application: matchedApp,
        // parentAppId: vinylApp._id,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error in fetching vinyl application due to ${error.message}`,
      });
    }
  };

const getVinylApp = async (req, res) => {
  try {
    const vinylApp = await VinylApplicationModel.find();

    if (vinylApp.length === 0) {
      return res.status(400).json({
        message: "Application not added. Kindly add one.",
      });
    }

    const totalApps = vinylApp.reduce(
      (acc, doc) => acc + (doc.application?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Vinyl applications fetched successfully.",
      applicationCount: totalApps,
      vinylApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching vinyl applications due to ${error.message}`,
    });
  }
};

const deleteSingleApp = async (req, res) => {
  try {
    const { applicationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: "Invalid applicationId" });
    }

    const vinylApp = await VinylApplicationModel.findOne({
      "application._id": applicationId,
    });

    if (!vinylApp) {
      return res.status(404).json({
        message: "App not found in any vinyl application.",
      });
    }

    const deletedVinylApp = vinylApp.application.find(
      (a) => a._id.toString() === applicationId
    );

    if (!deletedVinylApp) {
      return res.status(404).json({
        message: "Application not found in the array.",
      });
    }

    const updatedVinylApp = await VinylApplicationModel.findByIdAndUpdate(
      vinylApp._id,
      { $pull: { application: { _id: applicationId } } },
      { new: true }
    );

    await VinylProductModel.updateMany(
      { "product.applications": applicationId },
      { $set: { "product.$[elem].applications": null } },
      { arrayFilters: [{ "elem.applications": applicationId }] }
    );

    return res.status(200).json({
      message: "Vinyl application deleted successfully.",
      deletedVinylApp,
      updatedVinylApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl application: ${error.message}`,
    });
  }
};


const deleteVinylApp = async (req, res) => {
  try {
    const vinylApp = await VinylApplicationModel.findOne({});

    if (vinylApp.length === 0) {
      return res.status(400).json({
        message: "No vinyl application added to delete. Kindly add one.",
      });
    }

    const deletedVinylApp = await VinylApplicationModel.findByIdAndDelete(
      vinylApp._id
    );

    return res.status(200).json({
      message: "Vinyl application deleted successfully.",
      deletedVinylApp,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting vinyl application due to ${error.message}`,
    });
  }
};

module.exports = {
  createVinylApp,
  updateVinylApp,
  getSingleVinylApp,
  getVinylApp,
  deleteSingleApp,
  deleteVinylApp,
};
