const { Book } = require("../models/bookModels");

const getBooks = async (req, res) => {
  try {
    const data = await Book.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("server error");
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const getBookById = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const removeBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByIdAndRemove(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const updateBookById = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    if (!book) {
      res.status(400).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

const upadateReadStatus = async (req, res) => {
  const { bookId } = req.params;
  const { isRead } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { isRead },
      { new: true }
    );

    if (!book) {
      res.status(400).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500), json("server error");
  }
};

module.exports = {
  getBooks,
  addBook,
  getBookById,
  removeBook,
  updateBookById,
  upadateReadStatus,
};
