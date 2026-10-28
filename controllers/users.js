const User = require("../models/user");
// const crypto = require("crypto"); // removed (no email token now)
// const sendEmail = require("../verification"); // removed
// const { verifyEmailTemplate } = require("../utils/emailTemplates"); // removed

module.exports.userLogin = (req, res) => {
  res.render("listings/users/login");
};

module.exports.loginData = async (req, res, next) => {
  try {
    const dbUser = await User.findById(req.user._id);

    // Since we're not doing email verification anymore,
    // you can allow everyone to login.
    if (!dbUser) {
      req.logout(() => {});
      req.flash("error", "User not found.");
      return res.redirect("/login");
    }

    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl);
  } catch (err) {
    return next(err);
  }
};

module.exports.userSignup = (req, res) => {
  res.render("listings/users/signup");
};

module.exports.signupData = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Create user (auto-verified because no email system)
    const newUser = new User({
      username,
      email,
      isVerified: true, // ✅ changed from false to true
      // emailToken: undefined,
      // emailTokenExpiry: undefined
    });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Account created successfully!");
      return res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/signup");
  }
};

// If you still have /verify-email/:token route in routes,
// either remove that route OR keep this handler as a simple redirect.
module.exports.verifyEmail = async (req, res) => {
  req.flash("info", "Email verification is disabled.");
  return res.redirect("/listings");
};

module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "You are logged out successfully");
    return res.redirect("/listings");
  });
};
