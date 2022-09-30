const nodemailer = require("nodemailer");
const express = require("express");

const { META_PASSWORD } = process.env;

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, text } = req.body;

  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2255
    secure: true,
    auth: {
      user: "yerimjunior@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);

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
    console.log(error.message);
    next(error);
  }
});

module.exports = { nodemailerRouter: router };
