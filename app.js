const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/expressError.js");
const { listingSchema } = require("./schema.js");
const Review = require("./models/review.js");

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

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

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
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  })
);

//New Route      ---CREATE
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route

// ====> using try and catch
// app.post("/listings", async (req, res, next) => {
//   try {
//     // let {title, description, price, country, location} = req.body;
//     // let listing = req.body.listing;
//     const newListing = new Listing(req.body.listing);
//     console.log(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//   } catch (err) {
//     next(err);
//   }
// });

app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // let {title, description, price, country, location} = req.body;
    // let listing = req.body.listing;
    //Validations
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "sned valid data for listing");
    // }
    // if (!req.body.listing.title) {
    //   throw new ExpressError(400, "Title is missing");
    // }
    // if (!req.body.listing.description) {
    //   throw new ExpressError(400, "Description is missing");
    // }
    // if (!req.body.listing.price) {
    //   throw new ExpressError(400, "price is missing");
    // }
    // Schema Validation
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if (result.error) {
    //   throw new ExpressError(400, result.error);
    // }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

//show Route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);

//Edit Route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "sned valid data for listing");
    // }
    let { id } = req.params;
    console.log(req.body.listing);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

//Delete Route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

//Reviews
// Post Route
app.post("/listings/:id/reviews", async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("new review saved");
  res.redirect(`/listings/${listing._id}`);
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
