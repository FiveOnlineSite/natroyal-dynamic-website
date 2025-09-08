const contactModel = require("../../models/otherpages/contactModel");

const createContact = async (req, res, skipResponse = false) => {
  try {
    const { name, email, phone, message, page } = req.body;

    const newContact = new contactModel({
      name,
      email,
      phone,
      page,
      message,
    });

    await newContact.save();

    if (!skipResponse) {
      return res.status(200).json({
        message: "Added Contact content successfully.",
        newContact,
      });
    }

    return newContact; // return saved document if skipping response
  } catch (error) {
    if (!skipResponse) {
      return res.status(500).json({
        message: `Error in adding contact due to ${error.message}`,
      });
    }
    throw error;
  }
};


const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();

    if (contacts.length === 0) {
      return res.status(400).json({
        message: "No record found to fetch",
      });
    }

    res.status(200).json({
      message: "Contacts retrieved successfully.",
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in fetching contacts: ${error.message}`,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params._id;

    const contact = await contactModel.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found.",
      });
    }

    await contactModel.findByIdAndDelete(contactId);

    res.status(200).json({
      message: "Contact deleted successfully.",
      deletedContact: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in deleting contact: ${error.message}`,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};