const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.send("Hi! i'm root");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

//index Route     ---READ
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

//New Route      ---CREATE
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route
app.post("/listings", async (req, res) => {
  // let {title, description, price, country, location} = req.body;
  // let listing = req.body.listing;
  const newListing = new Listing(req.body.listing);
  console.log(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});



//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  console.log(req.body.listing);
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
   res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
