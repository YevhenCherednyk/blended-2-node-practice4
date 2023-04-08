const express = require("express");

const auth = require("../middlewares/auth");

const upload = require("../middlewares/upload");

const {
  getContacts,
  addContact,
  removeContact,
} = require("../controllers/contactControllers");
const { contactValidation } = require("../middlewares/contactsValidation");

const contactsRouter = express.Router();

// contactsRouter.get("/", auth, getBooks);

contactsRouter.get("/", getContacts);

// booksRouter.get("/:bookId", auth, getBookById);

// booksRouter.get("/:bookId", getBookById);

// contactsRouter.post("/", auth, postValidation, addBook);

contactsRouter.post("/", contactValidation, addContact);

// booksRouter.delete("/:bookId", auth, removeBook);

contactsRouter.delete("/:contactId", removeContact);

// booksRouter.put("/:bookId", auth, putValidation, updateBookById);

// booksRouter.patch("/:bookId/isRead", auth, patchValidation, upadateReadStatus);

module.exports = contactsRouter;
