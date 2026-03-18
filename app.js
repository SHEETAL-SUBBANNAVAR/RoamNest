const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./modules/listing");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/hotel");
}

app.get("/", (req, res) => {
  res.send("Hi, i am root!");
});

//index route for listings
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs",{allListings})
});
//show route for listings
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});

// app.get("/testListings", async (req, res) => {
//   let sampleListing = new Listing({ 
//     title: "Hotel California",
//     description: "Such a lovely place",
//     price: 1200,
//     location: "California",
//     country: "USA",
//   })
//   await sampleListing.save();
//   console.log("Sample listing saved to database");
//   res.send("Sucessfully added sample listing to database");
// });
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
