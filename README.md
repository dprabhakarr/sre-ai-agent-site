# SRE AI Agent Site

A landing page for an AI-powered SRE (Site Reliability Engineering) agent that detects and fixes production incidents.

## Features

- Responsive landing page
- Demo request form with email notifications
- Email integration using SendGrid (production) or Ethereal (testing)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - For production: Get a SendGrid API key and set `SENDGRID_API_KEY`
   - Set `EMAIL_RECIPIENT` to where demo requests should be sent

3. Start the server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Email Configuration

### For Testing (Default)
The app automatically uses Ethereal Email for testing when no credentials are present. You can view HTML previews from the function log output (via `nodemailer.getTestMessageUrl`).

### For Production (SendGrid recommended)
1. Sign up at https://sendgrid.com and obtain an API key.
2. Set `SENDGRID_API_KEY` in your environment.
3. Set email destinations:
   - `MAIL_FROM=noreply@your-domain.com`
   - `EMAIL_RECIPIENT=recipient@your-domain.com`

### Optional Gmail SMTP (not recommended for SWA)
If you need Gmail SMTP, enable 2FA and create an app password:
1. https://myaccount.google.com/security
2. https://myaccount.google.com/apppasswords
3. Set env variables:
   - `EMAIL_USER=your-gmail@gmail.com`
   - `EMAIL_PASS=your-gmail-app-password`
   - `MAIL_FROM=your-gmail@gmail.com`
   - `EMAIL_RECIPIENT=recipient@your-domain.com`

On SWA, Gmail SMTP may be blocked by outbound network policy. Use SendGrid or another API-based provider for reliable production delivery.

## Deployment

This app can be deployed to any Node.js hosting service like Heroku, Vercel, or Railway.

Make sure to set the environment variables in your deployment platform.