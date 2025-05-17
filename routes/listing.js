const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//index Route     ---READ
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  })
);

//New Route      ---CREATE
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route

// ====> using try and catch
// router.post("/listings", async (req, res, next) => {
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

router.post(
  "/",
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
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

//Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Route
router.put(
  "/:id",
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
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

module.exports = router;
