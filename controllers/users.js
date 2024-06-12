const User = require("../models/user");

module.exports.rendersignupform= (req, res) => {
    console.log("signup pg");
    res.render("users/singup.ejs");
  };


module.exports.singuppg= async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newuser = new User({
        email,
        username,
      });
      const result = await User.register(newuser, password);
      console.log(result);
      req.login(result, (err)=>{
        if(err){
            next(err);
        }
      req.flash("success", "Successfully  Registered");
      res.redirect("/listing");
      })
      
    } catch (e) {
      req.flash("deleted", e.message);
      res.redirect("/signup");
    }
  }

  module.exports.renderloginpg = (req, res) => {
    console.log("login page");
    res.render("users/login.ejs");
  }
  module.exports.loginpg =  async (req, res) => {
    console.log("post req after login");
    req.flash("success", "Welcome back!");
    let redirectUrl= res.locals.redirectUrl || "/listing"
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }
  module.exports.logoutpg =  (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success", "You are logged out");
        res.redirect("/listing");
    })
}
  