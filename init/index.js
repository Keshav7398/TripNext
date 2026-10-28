const mongoose = require("mongoose");
const Data = require("./data");
const Listing = require("../models/listing");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
  console.log("Connected to MongoDB");
}

async function initDB() {
  await main();

  await Listing.deleteMany({});
  console.log("Old listings removed.");

  const listingsWithOwner = Data.data.map(obj => ({
    ...obj,
    owner: "694f2ffdce42ec6afddfe95e" // valid user ObjectId
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("New listings added.");

  mongoose.connection.close();
}

initDB();
