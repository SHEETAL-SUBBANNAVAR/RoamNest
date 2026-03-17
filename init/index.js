const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../modules/listing");

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/hotel");
}

const initdb = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
};

initdb();