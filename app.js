const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./modules/listing");
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

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
//new route for listings
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//show route for listings
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});
//create route
app.post("/listings", async (req, res) => {
  const newlisting = new Listing(req.body.listing);
  console.log(newlisting);
  await newlisting.save();
  res.redirect("/listings");  
});

//edit route for listings
app.get("/listing/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  console.log(listing);
  res.render("./listings/edit.ejs", { listing });
});
//update route for listings
app.put("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  console.log(listing);
  res.redirect(`/listings/${id}`);
});
//delete route for listings
app.delete("/listing/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
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
