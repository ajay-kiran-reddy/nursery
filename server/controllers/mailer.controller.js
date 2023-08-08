const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ajaykiranreddy999@gmail.com",
    pass: "jraaflhaohlbiqgf",
  },
});

module.exports = { transporter };
