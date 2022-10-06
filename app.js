const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const {
  contactsRouter,
  usersRouter,
  filesRouter,
  nodemailerRouter,
} = require("./routes/api");

const { errorHandler } = require("./helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/files", filesRouter);
app.use("/api/mail", nodemailerRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
