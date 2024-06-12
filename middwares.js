const Listing = require("./models/listing");
const Review = require("./models/review");
module.exports.validatelisting=(req,res,next)=>{
    let {error}= listingschema.validate(req.body);
     if((error)){
      let errmsg= error.details.map((el)=>el.message.join(","));
       throw new expresserror(400, errmsg);
     }
     else next();
  }

module.exports.isloggedin= (req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log(req.originalUrl);
        req.session.redirectUrl = req.originalUrl
        req.flash("deleted", "Sorry,You're not logged in!")
      return res.redirect("/login");
      }
      next();
 
}
module.exports.saveredirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
        console.log(res.locals.redirectUrl);
    }
    next();
}
module.exports.isowner= async (req,res,next)=>{
    let {id}= req.params;
  let list= await Listing.findById(id);
  if(!  list.owner._id.equals(res.locals.currentuser._id)){
    req.flash('deleted', "YOU DO NOT OWN THIS");
    return res.redirect(`/listing/${id}`);
  }
  next();
}
module.exports.isreviewauthor= async (req,res,next)=>{
    let {id, reviewid}= req.params;
  let review= await Review.findById(reviewid);
  if(!  review.author._id.equals(res.locals.currentuser._id)){
    req.flash('deleted', "YOU DO NOT OWN THIS");
    return res.redirect(`/listing/${id}`);
  }
  next();
}