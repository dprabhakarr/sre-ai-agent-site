const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dpreddy11@gmail.com',
        pass: 'meos naoa ffkd xbee'
    }
});

app.post('/submit', (req, res) => {
    const email = req.body.email;
    const mailOptions = {
        from: 'dpreddy11@gmail.com',
        to: 'dpreddy11@gmail.com',
        subject: 'Demo Request',
        text: `Email: ${email}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Demo request submitted successfully! Our executive will contact you soon.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});