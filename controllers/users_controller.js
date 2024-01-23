const User = require("../models/user");

module.exports.user_profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

//user the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//user the sign in page
module.exports.signin = function (req, res) {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the signup data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  //   User.findOne({ email: req.body.email }, function (err, user) {
  //     if (err) {
  //       console.log("error in finding user in signing up");
  //       return;
  //     }

  //     if (!user) {
  //       User.create(req.body, function (err, user) {
  //         if (err) {
  //           console.log("error in creating user while signing up");
  //           return;
  //         }
  //         return res.redirect("/users/sign-in");
  //       });
  //     } else {
  //       return res.redirect("back");
  //     }
  //   });
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        // User does not exist, create a new one
        return User.create(req.body);
      } else {
        // User already exists, redirect back
        return Promise.resolve(user);
      }
    })
    .then((user) => {
      // Redirect based on whether user was created or already existed
      return res.redirect(user ? "/users/sign_in" : "back");
    })
    .catch((err) => {
      console.log("Error in finding/creating user:", err);
      // Handle the error appropriately, e.g., send an error response
      res.status(500).send("Internal Server Error");
    });
};
//sign in and create the session for the user
module.exports.createSession = function (req, res) {
  // TODO later
};
