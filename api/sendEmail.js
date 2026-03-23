const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).send("Method not allowed");
    }

    const { email } = req.body || {};

    if (!email) {
        return res.status(400).send("Email is required");
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

        res.status(200).send("Email sent successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send email");
    }
};