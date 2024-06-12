const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const { saveredirectUrl } = require("../middwares");
const usercontroller= require("../controllers/users");


router.get("/signup", usercontroller.rendersignupform );


router.post(
  "/signup",
  wrapasync(usercontroller.singuppg)
);



router.get("/login",usercontroller.renderloginpg);


router.post(
  "/login",saveredirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
usercontroller.loginpg
);

router.get("/logout",usercontroller.logoutpg)
module.exports = router;
