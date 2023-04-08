const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./router/contactsRouter");
const authRouter = require("./router/usersRouter");

const startServer = () => {
  const app = express();

  const { PORT, DB_HOST } = process.env;

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  app.use("/api/users", authRouter);
  app.use("/api/contacts", contactsRouter);

  try {
    mongoose.connect(DB_HOST);

    console.log("Database connection successful");
    app.listen(PORT || 3000, () => {
      console.log(`Server is rinning on porty ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
