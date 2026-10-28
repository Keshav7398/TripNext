const express = require("express");
const router = express.Router();
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const usersController = require("../controllers/users");

// ratelimiter in login
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many attempts, try later",
  standardHeaders: true,
  legacyHeaders: false,
});

// ================= LOGIN =================
router.route("/login")
  .get(usersController.userLogin)
  .post(
    saveRedirectUrl,
    authLimiter,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    usersController.loginData
  );

// ================= SIGNUP =================
router.route("/signup")
  .get(usersController.userSignup)
  .post(authLimiter, wrapAsync(usersController.signupData));

// ================= LOGOUT =================
router.post("/logout", usersController.userLogout);

module.exports = router;
