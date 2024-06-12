const express= require("express");
const wrapasync= require('../utils/wrapasync')
const {listingschema}= require("../schema.js");
const expresserror= require('../utils/expresserror.js');
const Listing = require("../models/listing");
const Review= require("../models/review.js");
const { isloggedin, isreviewauthor } = require("../middwares.js");
const reviewscontroller= require("../controllers/reviews.js");

const router= express.Router({mergeParams: true});

router.post("/", isloggedin, reviewscontroller.postreview);
  
  router.delete("/:reviewid",isreviewauthor,isloggedin, wrapasync(reviewscontroller.deletereview));
  
  module.exports= router;