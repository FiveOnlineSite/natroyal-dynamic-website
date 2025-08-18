const EventsModel = require("../../models/lvt/eventsModel");
const cloudinary = require("../../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle } = req.body;

    const eventData = JSON.parse(req.body.event);

    const files = req.files;
    if (!Array.isArray(eventData) || eventData.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one event is required." });
    }

    if (!files || files.length !== eventData.length) {
      return res
        .status(400)
        .json({ message: "Each event must have a corresponding image." });
    }

    const uploadedEvent = [];

    for (let i = 0; i < eventData.length; i++) {
      const event = eventData[i];
      const file = files[i];

      const ext = path.extname(file.originalname).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      if (!isImage) {
        return res.status(400).json({
          message: `Unsupported file type for youtube thumbnail: ${file.originalname}`,
        });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "events",
        resource_type: "image",
      });

      const filePath = path.resolve(file.path);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Temp file deleted:", filePath);
        } else {
          console.warn("File not found for deletion:", filePath);
        }
      } catch (err) {
        console.error("Error deleting temp file:", err.message);
      }

      uploadedEvent.push({
        youtube_thumbnail: [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ],
        youtube_url: event.youtube_url,
        alt: event.alt,
      });
    }

    const newEvent = new EventsModel({
      yellow_title,
      black_title,
      subtitle,
      event: uploadedEvent,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in creating event: ${error.message}`,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { yellow_title, black_title, subtitle } = req.body;

    let eventData = [];
    if (req.body.event && req.body.event !== "undefined") {
      eventData = JSON.parse(req.body.event);
    }

    const files = req.files; // using upload.any()
    const fileMap = {};

    // Create a lookup map: { youtube_thumbnail_0: file, youtube_thumbnail_1: file, ... }
    for (const file of files) {
      fileMap[file.fieldname] = file;
    }

    const currentEvent = await EventsModel.findOne({});
    if (!currentEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    const uploadedEvent = [];
    const modifiedEvent = [];

    for (let i = 0; i < eventData.length; i++) {
      const event = eventData[i];
      const file = fileMap[event.thumbnail_key]; // 👈 this is the key fix

      let imageData = [];

      if (file) {
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = [".webp", ".jpg", ".jpeg", ".png"].includes(extname);
        if (!isImage) {
          return res.status(400).json({
            message: `Unsupported image type: ${file.originalname}`,
          });
        }

        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "events",
          resource_type: "image",
        });

        imageData = [
          {
            filename: uploadResult.original_filename,
            filepath: uploadResult.secure_url,
          },
        ];

        const filePath = path.resolve(file.path);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      if (event._id) {
        const existingIndex = currentEvent.event.findIndex(
          (a) => a._id.toString() === event._id
        );

        if (existingIndex !== -1) {
          const existingEvent = currentEvent.event[existingIndex];
          currentEvent.event[existingIndex] = {
            ...existingEvent,
            youtube_url: event.youtube_url,
            alt: event.alt,
            youtube_thumbnail:
              imageData.length > 0
                ? imageData
                : existingEvent.youtube_thumbnail,
          };
        }
      } else {
        const newEvent = {
          youtube_url: event.youtube_url || "",
          alt: event.alt || "",
          youtube_thumbnail: imageData,
        };
        uploadedEvent.push(newEvent);
        modifiedEvent.push(newEvent);
      }
    }

    const updatedFields = {
      subtitle,
      yellow_title,
      black_title,
      event: [...currentEvent.event, ...uploadedEvent],
    };

    await EventsModel.findByIdAndUpdate(currentEvent._id, updatedFields, {
      new: true,
    });

    return res.status(200).json({
      message: "Event updated successfully.",
      modifiedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating event due to ${error.message || error}`,
    });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid eventId" });
    }

    const event = await EventsModel.findOne({
      "event._id": new mongoose.Types.ObjectId(eventId),
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found in any event document.",
      });
    }

    const matchedEvent = event.event.find((e) => e._id.toString() === eventId);

    if (!matchedEvent) {
      return res.status(404).json({ message: "Event not found in array." });
    }

    return res.status(200).json({
      message: "Event fetched successfully.",
      event: matchedEvent,
      // parentEventId: event._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching event due to ${error.message}`,
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const events = await EventsModel.find();

    if (events.length === 0) {
      return res.status(400).json({
        message: "Event not added. Kindly add one.",
      });
    }

    const totalEvents = events.reduce(
      (acc, doc) => acc + (doc.event?.length || 0),
      0
    );

    return res.status(200).json({
      message: "Events fetched successfully.",
      eventCount: totalEvents,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching events due to ${error.message}`,
    });
  }
};

const deleteSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid eventId" });
    }

    const event = await EventsModel.findOne({
      "event._id": eventId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found in any event.",
      });
    }

    const deletedEvent = event.event.find((a) => a._id.toString() === eventId);

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found in the array.",
      });
    }

    const updatedEvent = await EventsModel.findByIdAndUpdate(
      event._id,
      {
        $pull: { event: { _id: eventId } },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Coated event deleted successfully.",
      deletedEvent,
      updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error deleting event from coated event: ${error.message}`,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await EventsModel.findOne({});

    if (event.length === 0) {
      return res.status(400).json({
        message: "No event added to delete. Kindly add one.",
      });
    }

    const deletedEvent = await EventsModel.findByIdAndDelete(event._id);

    return res.status(200).json({
      message: "Event deleted successfully.",
      deletedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in deleting event due to ${error.message}`,
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getSingleEvent,
  getEvent,
  deleteSingleEvent,
  deleteEvent,
};
