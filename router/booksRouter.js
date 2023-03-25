const express = require("express");

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

booksRouter.get("/", getBooks);

booksRouter.get("/:bookId", getBookById);

booksRouter.post("/", postValidation, addBook);

booksRouter.delete("/:bookId", removeBook);

booksRouter.put("/:bookId", putValidation, updateBookById);

booksRouter.patch("/:bookId/isRead", patchValidation, upadateReadStatus);

module.exports = booksRouter;
