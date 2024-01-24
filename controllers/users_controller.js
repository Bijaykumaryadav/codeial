const User = require("../models/user");

// module.exports.user_profile = function (req, res) {
//   if(req.cookies.user_id){
//     User.findById(req.cookies.user_id , function(err,user){
//       if(user){
//         return res.render('user_profile',
//         {
//           title: "User Profile",
//           user: user
//         })
//       }
//       return res.redirect('/users/sign-in');
//     });
//   }else{
//     return redirect('/users/sign-in');
//   }
// };

module.exports.user_profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id).exec();

      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/sign_in");
    } else {
      return res.redirect("/users/sign_in");
    }
  } catch (err) {
    console.log("Error in finding user:", err);
    // Handle the error appropriately, e.g., send an error response
    return res.status(500).send("Internal Server Error");
  }
};

//render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the sign in page
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
// module.exports.createSession = function (req, res) {
//   //steps to authenticate
//   // find the user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in finding user in signing in");
//       return;
//     }
//     //handle user found
//     if (user) {
//       //handle password which don't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       //handle session creation
//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       //handle user not found
//       return res.redirect("back");
//     }
//   });
// };
module.exports.createSession = async function (req, res) {
  try {
    // find the user
    const user = await User.findOne({ email: req.body.email }).exec();

    // handle user found
    if (user) {
      // handle password which doesn't match
      if (user.password !== req.body.password) {
        return res.redirect("back");
      }

      // handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      // handle user not found
      return res.redirect("back"); 
    }
  } catch (err) {
    console.log("Error in finding user:", err);
    // Handle the error appropriately, e.g., send an error response
    return res.status(500).send("Internal Server Error");
  }
};