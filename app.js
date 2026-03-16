const express = require("express");
const app = express();
const mongoose = require("mongoose");

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/hotel");
}

app.get("/", (req, res) => {
  res.send("Hi, i am root!");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
