
require('dotenv').config();
console.log(process.env.SECRET)
const express= require("express");
const ejsmate= require('ejs-mate');
const mongoose = require("mongoose")
const app= express();
const expresserror= require('./utils/expresserror.js');
const flash= require('connect-flash');
const path = require("path");
const methodoverride= require('method-override');


const session= require("express-session");
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:"true"}));
app.set("view engine", "views");
app.set(path.join(__dirname,"views"));
app.use(methodoverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")))

const passport= require("passport");
const localstrategy= require("passport-local");

const User = require("./models/user.js");

const listingrouter= require("./routes/listing.js")
const reviewrouter= require("./routes/review.js");
const userrouter= require("./routes/user.js");

const PORT= process.env.PORT || 8080
main().then(res=>{console.log("connection with mongo successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const store = MongoStore.create(
  {
    mongoUrl: process.env.MONGO_URL,
    crypto : {
      secret: process.env.SECRET
    },
    touchAfter : 24 *36
  }
);

store.on("error", ()=> {console.log("ERROR in mongo sesh store")});
const sessionoptions = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7*24*60*60*1000 ,
    maxAge : 7*24*60*60*1000,
    httponly : true
  }
};


app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.success= req.flash("success");
  res.locals.deleted= req.flash("deleted");
  res.locals.currentuser= req.user;
  next();
})


app.get("/demouser",async (req,res)=>{
let fakeuser= new User({
  email : "student@gmail.com",
  username  :"fakoo"
});
let result = await User.register(fakeuser,"mypass" );
res.send(result);
})

app.use("/listing", listingrouter);
app.use("/listing/:id/reviews", reviewrouter);
app.use("/", userrouter);


// app.get("/", (req,res)=>{
//   console.log("root page");
//    res.send("i am root");
// })


app.all("*", (req,res,next)=>{
  next(new expresserror(404, "page not found"));
})

app.use((err,req,res,next)=>{
  let {statusCode=500,message="Internal Server Error"}= err;
  // res.status(statusCode || 500).send(message || 'Internal Server Error');
  res.status(statusCode).render("error.ejs", {err});
});
  app.listen(PORT, ()=>{
    console.log("8080 is listening");
})
