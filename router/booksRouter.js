const express = require("express");

const auth = require("../middlewares/auth");

const {
  getBooks,
  addBook,
  getBookById,
  removeBook,
  updateBookById,
  upadateReadStatus,
} = require("../controllers/booksControllers");
const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../middlewares/booksValidation");

const booksRouter = express.Router();

booksRouter.get("/", auth, getBooks);

booksRouter.get("/:bookId", auth, getBookById);

booksRouter.post("/", auth, postValidation, addBook);

booksRouter.delete("/:bookId", auth, removeBook);

booksRouter.put("/:bookId", auth, putValidation, updateBookById);

booksRouter.patch("/:bookId/isRead", auth, patchValidation, upadateReadStatus);

module.exports = booksRouter;
