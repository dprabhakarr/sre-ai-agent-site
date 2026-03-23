const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const GMAIL_USER = process.env.GMAIL_USER || 'dpreddy11@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || 'meos naoa ffkd xbee';
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'dpreddyy11@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await transporter.sendMail({
      from: GMAIL_USER,
      to: EMAIL_RECIPIENT,
      subject: 'New Demo Request',
      text: `New demo request from: ${email}\n\nThanks for your request, our executive will contact you soon.`,
    });

    return res.status(200).json({ message: 'Thanks for your request, our executive will contact you soon.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});