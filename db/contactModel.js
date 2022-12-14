const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name foor contact"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: ObjectId,
    ref: "user",
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
