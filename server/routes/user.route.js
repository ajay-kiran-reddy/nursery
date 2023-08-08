const express = require("express");
const router = express.Router();
const {
  handleForgotPassword,
  handleSignIn,
  handleSignUp,
} = require("../controllers/user.controller");

router.post("/signup", (req, res) => {
  return handleSignUp(req, res);
});

router.post("/signIn", (req, res) => {
  return handleSignIn(req, res);
});

router.post("/forgotPassword", (req, res) => {
  return handleForgotPassword(req, res);
});

module.exports = router;
