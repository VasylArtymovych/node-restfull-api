const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const productsDir = path.resolve("public", "products");
const products = [];

const filesController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(productsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("products", originalname);
    const newProduct = {
      id: crypto.randomUUID(),
      name: req.body.name,
      image,
    };
    products.push(newProduct);

    res.status(200).json(newProduct);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};
module.exports = { filesController, products };
