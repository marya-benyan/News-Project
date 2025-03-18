// authRoutes.js
const express = require("express");
const passport = require("passport");
const { signin, logoutUser , getUserProfile} = require("../controllers/loginController");
const { signup, googleAuth } = require("../controllers/signupController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logoutUser);
router.get("/profile",  getUserProfile);


// Google OAuth Login
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   googleAuth
// );

module.exports = router;
