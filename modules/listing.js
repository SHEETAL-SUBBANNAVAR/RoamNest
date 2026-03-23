const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    filename: {
      type: String,
      default: "default-image"
    }
  },
  price: Number,
  location: String,
  country: String,
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
