const { Schema, model } = require("mongoose");

const booksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      validate: (value) => {
        value.startsWith("http");
      },
    },

    plot: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Book = model("book", booksSchema);

module.exports = {
  Book,
};
