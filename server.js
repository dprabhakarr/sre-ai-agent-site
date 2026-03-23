require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For production, use Gmail with app password
// Enable 2FA on your Gmail account and generate an app password at:
// https://myaccount.google.com/apppasswords
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'dpreddy11@gmail.com';

let transporter;
async function createTransporter() {
  if (!transporter) {
    if (GMAIL_USER && GMAIL_APP_PASSWORD) {
      // Use Gmail for production
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
      });
      console.log('Using Gmail for email delivery');
    } else {
      // Fallback to Ethereal for testing
      console.log('No GMAIL_USER/GMAIL_APP_PASSWORD found, using Ethereal for testing');
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Ethereal test account created:', testAccount.user);
    }
  }
  return transporter;
}

app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
      from: '"Demo Request" <noreply@example.com>',
      to: EMAIL_RECIPIENT,
      subject: 'New Demo Request',
      text: `New demo request from: ${email}\n\nThanks for your request, our executive will contact you soon.`,
    });

    console.log('Email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    return res.status(200).json({ message: 'Thanks for your request, our executive will contact you soon.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});