const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const GMAIL_USER = process.env.EMAIL_USER;
const GMAIL_PASS = process.env.EMAIL_PASS;
const MAIL_FROM = process.env.MAIL_FROM || GMAIL_USER || "no-reply@example.com";
const MAIL_TO = process.env.EMAIL_RECIPIENT || process.env.EMAIL_TO || GMAIL_USER || "recipient@example.com";

async function sendWithSendGrid(email) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  return sgMail.send({
    to: MAIL_TO,
    from: MAIL_FROM,
    subject: "New Demo Request 🚀",
    text: `User email: ${email}`,
  });
}

async function sendWithGmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: "New Demo Request 🚀",
    text: `User email: ${email}`,
  });
}

async function sendWithEthereal(email) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: "New Demo Request 🚀",
    text: `User email: ${email}`,
  });

  return { messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) };
}

module.exports = async function (context, req) {
  const { email } = req.body || {};

  if (!email) {
    context.res = {
      status: 400,
      body: "Email is required",
    };
    return;
  }

  try {
    let result;

    if (SENDGRID_API_KEY) {
      context.log("Using SendGrid for email delivery");
      result = await sendWithSendGrid(email);
    } else if (GMAIL_USER && GMAIL_PASS) {
      context.log("Using Gmail SMTP for email delivery");
      result = await sendWithGmail(email);
    } else {
      context.log("No SendGrid/Gmail credentials found; using Ethereal for testing");
      result = await sendWithEthereal(email);
    }

    context.res = {
      status: 200,
      body: {
        message: "Email sent successfully",
        info: result,
      },
    };
  } catch (err) {
    context.log("EMAIL ERROR:", err);
    context.res = {
      status: 500,
      body: {
        error: "Failed to send email",
        detail: err.message,
      },
    };
  }
};