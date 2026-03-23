const nodemailer = require("nodemailer");

module.exports = async function (context, req) {
    const { email } = req.body || {};

    if (!email) {
        context.res = {
            status: 400,
            body: "Email is required"
        };
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Demo Request 🚀",
            text: `User email: ${email}`
        });

        context.res = {
            status: 200,
            body: "Email sent successfully"
        };
    } catch (err) {
        context.log("EMAIL ERROR:", err);

        context.res = {
            status: 500,
            body: err.message
        };
    }
};