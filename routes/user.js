const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/users.js");
const { saveRedirectUrl } = require("../middleware.js");

// Signup routes
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

// Login routes
router.route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { 
      failureRedirect: '/login', 
      failureFlash: true 
    }),
    userController.login
  );

// Logout
router.get("/logout", userController.logout);



// Home route
router.get("/", (req, res) => {
  res.render("index.ejs"); // or index.ejs
});


module.exports = router;
