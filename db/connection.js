const mongoose = require("mongoose");

const { DB_NAME, MONGO_URI } = process.env;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log("Connected successfully to server");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = {
  connectMongo,
};
