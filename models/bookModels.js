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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Book = model("book", booksSchema);

module.exports = {
  Book,
};
