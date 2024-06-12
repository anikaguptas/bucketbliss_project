const Listing= require("../models/listing");

module.exports.index =async (req,res)=>{
    let lists= await Listing.find({});
    console.log("main lisiting page")
    res.render("listing.ejs",{lists});
   };
module.exports.rendernewform =(req,res)=>{
    console.log(req.user);
     console.log("creating new pg");
     res.render("new.ejs");
   };
module.exports.showlisting= async (req,res)=>{
    let {id}= req.params;
    console.log("showing detailed page")
    let list= await Listing.find({_id : id})
    .populate({path : "reviews",
     populate :
     { path: "author"}
    })
    .populate("owner");
    let details = list[0];
    console.log(details);
    res.render("show.ejs", {details})
  
  }
module.exports.createlisting =async (req,res,next)=>{
  console.log(req.file);
 let url =  req.file.url;
    let listing= req.body.listing;
  const newlist= new Listing(listing);
  console.log(req.user._id.toString());
  newlist.owner= req.user._id;
  newlist.image.url= url;
  console.log(newlist);
  await newlist.save();
  req.flash("success", "New Listing created");
  res.redirect("/listing");

};
module.exports.rendereditform = async (req,res)=>{
    let {id}= req.params;
    let list=await Listing.findById(id);
    console.log(list);
    console.log("edit page");
    res.render("edit.ejs", {list});
  }

module.exports.updatelisting = async (req,res)=>{
    if(!(req.body.listing)){
      throw new expresserror(400, "send valid data for listing");
    }
    let listing = req.body.listing;
    let {id}= req.params;
    await Listing.updateOne({_id : id}, listing);
    console.log(listing);
    // console.log(list);
    if (typeof req.file !== 'undefined') { // Check if newurl is defined
      let url = req.file.url;
      await Listing.updateOne({_id : id}, {image : {url : url}});
      // await listing.save();
    }
    res.redirect("/listing");
  }
  module.exports.deletelisting = async (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    console.log("deleted");
    req.flash("deleted", "Listing deleted");
    res.redirect("/listing");
  }