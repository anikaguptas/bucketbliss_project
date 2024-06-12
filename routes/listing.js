const express = require("express");
const wrapasync = require("../utils/wrapasync");
const { listingschema } = require("../schema.js");
const expresserror = require("../utils/expresserror.js");
const Listing = require("../models/listing");
const session = require("express-session");
const flash = require("connect-flash");
const { isloggedin, isowner } = require("../middwares.js");
const router = express.Router();
const listingcontroller = require("../controllers/listings.js");
const { validatelisting } = require("../middwares.js");

const multer = require("multer");

const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapasync(listingcontroller.index))
  .post(upload.single("listing[image][url]"),listingcontroller.createlisting);

router.get("/new", isloggedin, listingcontroller.rendernewform);

router
  .route("/:id")
  .get(listingcontroller.showlisting)
  .patch(isloggedin, isowner, upload.single("listing[image][url]"),listingcontroller.updatelisting)
  .delete(isloggedin, isowner, listingcontroller.deletelisting);

//edit route
router.get("/:id/edit", isloggedin, isowner, listingcontroller.rendereditform);

module.exports = router;
