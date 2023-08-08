const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
// const {
//   verifyToken,
//   isUserAuthenticated,
//   isAdminAuthenticated,
// } = require("../middleware/authenticate");
const { transporter } = require("../controllers/mailer.controller");

const handleSignUp = (req, res) => {
  const { email, password, phoneNumber } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    User.findOne({ email }).then((user) => {
      if (user) {
        res.status(500).json({
          message:
            "User already exists. Please login with user name and password",
          error,
        });
      } else {
        const user = new User({ ...req.body, password: hash });
        user
          .save()
          .then((user) =>
            res.status(200).json({ message: "User created successfully", user })
          )
          .catch((err) => {
            res.status(500).json({
              message: "Failed to create user",
              error: err,
            });
          });
      }
    });
  });
};

const handleSignIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      const userDbPassword = user.password;
      console.log(user, "[USER]");
      bcrypt
        .compare(password, userDbPassword)
        .then(function (result) {
          if (result === true) {
            let currentTime = new Date().getTime();
            let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000);

            var token = jwt.sign(
              {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                isAdmin: user.isAdmin,
              },
              process.env.JWT_SECRET,
              { expiresIn: "2h" }
            );

            res.status(200).json({
              message: "Successfully logged in. Happy Shopping :)",
              ...user._doc,
              jwtToken: {
                accessToken: token,
                email: user.email,
                expiresIn: "2h",
                expiredAt: new Date(updatedTIme).getTime(),
              },
            });
          } else {
            res
              .status(400)
              .json({ message: "Password is incorrect", status: 400 });
          }
        })
        .catch((error) => console.log(error, "[ERROR]"));
    } else {
      res.status(400).json({
        message: "Your user name or password is incorrect. Please try again",
        status: 400,
      });
    }
  });
};

const handleForgotPassword = (req, res) => {
  const randomPassword = Math.random().toString(36).slice(-8);

  const { email } = req.body;

  bcrypt.hash(randomPassword, saltRounds, function (err, hash) {
    User.findOne({ email }).then((user) => {
      if (user) {
        const emailBody = {
          from: "ajaykiranreddy999@gmail.com",
          to: req?.body?.email,
          subject: "Password reset for e-commerce",
          html: `<p>Hi,  You have requested for a password change. <br/>
           Please login into our e commerce app with the password below.</p>
         <b>${randomPassword}</b>
          <p>Please change the password in your profile page , once you logged in to the site </p>
         `,
        };

        User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              email: user.email,
              userName: user.userName,
              password: hash,
              isAdmin: user.isAdmin,
              _id: user._id,
            },
          },
          { new: true }
        )
          .then((updatedUser) => console.log(updatedUser, "[UPDATED USER]"))
          .catch((error) => console.log(error, "[ERROR]"));

        transporter.sendMail(emailBody, (error, info) => {
          if (error) {
            res.status(500).json({
              message: "Failed to reset password",
              error: err,
            });
          }
          // const fetchedUser = { ...user, password: randomPassword };
          // console.log(fetchedUser, "[fetchedUser]");
          res.status(200).json({
            message: "Password reset link is sent to you email. Please check.",
            mailInfo: info?.messageId,
          });
        });
      } else {
        res
          .status(400)
          .json({ message: `No user found with the email id ${email}.` });
      }
    });
  });
};

module.exports = { handleSignIn, handleSignUp, handleForgotPassword };
