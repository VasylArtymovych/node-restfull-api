const nodemailer = require("nodemailer");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, text } = req.body;
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "yerimjunior@meta.ua",
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: "yerimjunior@meta.ua",
    to: "yerimm@gmail.com",
    subject: "Testing send mail",
    text: `${text}, Sender: ${name} `,
  };

  try {
    await transporter.sendMail(emailOptions);
    res.render("done");
  } catch (error) {
    next(error);
  }
});

module.exports = { nodemailerRouter: router };
