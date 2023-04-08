const express = require("express");

const auth = require("../middlewares/auth");

// const upload = require("../middlewares/upload");

const {
  getContacts,
  addContact,
  removeContact,
} = require("../controllers/contactControllers");
const { contactValidation } = require("../middlewares/contactsValidation");

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getContacts);

contactsRouter.post("/", auth, contactValidation, addContact);

contactsRouter.delete("/:contactId", auth, removeContact);

module.exports = contactsRouter;
