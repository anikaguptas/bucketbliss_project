const Review= require("../models/review");
const Listing= require("../models/listing");
 
module.exports.postreview = async (req,res)=>{
    let {id}= req.params;
   let listing= await Listing.findById(id);
   console.log(req.body.review);
   let newreview= new Review(
      req.body.review
   )
   newreview.author= req.user._id;
   listing.reviews.push(newreview);
   await newreview.save();
   await listing.save();
    console.log("review added"); 
    res.redirect(`/listing/${id}`);
  }

  module.exports.deletereview=  async (req,res)=>{
    let {id,reviewid}= req.params;
    console.log(id);
    console.log(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull : {reviews: reviewid} });
    let result = await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
  }