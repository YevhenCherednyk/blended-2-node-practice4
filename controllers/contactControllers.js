const { Contact } = require("../models/contactModels");

const getContacts = async (req, res) => {
  try {
    const data = await Contact.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("server error");
  }
};

const addContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

// const getBookById = async (req, res) => {
//   const { bookId } = req.params;

//   try {
//     const book = await Book.findById(bookId);

//     if (!book) {
//       res.status(404).json({ message: "Book not found" });
//       return;
//     }

//     res.status(200).json(book);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("server error");
//   }
// };

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json({ message: "Contact was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

// const updateBookById = async (req, res) => {
//   const { bookId } = req.params;

//   try {
//     const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
//     if (!book) {
//       res.status(400).json({ message: "Book not found" });
//       return;
//     }

//     res.status(200).json(book);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("server error");
//   }
// };

// const upadateReadStatus = async (req, res) => {
//   const { bookId } = req.params;
//   const { isRead } = req.body;

//   try {
//     const book = await Book.findByIdAndUpdate(
//       bookId,
//       { isRead },
//       { new: true }
//     );

//     if (!book) {
//       res.status(400).json({ message: "Book not found" });
//       return;
//     }
//     res.status(200).json(book);
//   } catch (error) {
//     console.log(error);
//     res.status(500), json("server error");
//   }
// };

module.exports = {
  getContacts,
  addContact,
  removeContact,
};
