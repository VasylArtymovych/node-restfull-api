const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (data) => {
  const msg = {
    from: "yerimjunior@meta.ua",
    ...data,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    return error.message;
  }
};

module.exports = { sendMail };
