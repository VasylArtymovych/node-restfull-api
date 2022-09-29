const express = require("express");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const { filesController, products } = require("../../controllers");
const { controllerWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

const tempDir = path.join(__dirname, "../../", "temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const [, extention] = file.originalname.split(".");
    cb(null, `${crypto.randomUUID()}.${extention}`);
  },
  lomits: {
    fileSize: 2048,
  },
});

const uploadMiddleware = multer({ storage });

router.post(
  "/upload",
  uploadMiddleware.single("image"),
  controllerWraper(filesController)
);
router.use("/download", express.static(tempDir));

router.get("/products", (req, res) => {
  res.json(products);
});

module.exports = { filesRouter: router };
