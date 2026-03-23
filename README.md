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
The app automatically uses Ethereal Email for testing. No setup required - emails go to a virtual inbox.

### For Production (Gmail)
1. **Enable 2-Factor Authentication** on your Gmail account: https://myaccount.google.com/security
2. **Generate an App Password**: 
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (custom name)"
   - Enter "SRE Demo Site" as the name
   - Copy the 16-character password
3. **Set environment variables**:
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   EMAIL_RECIPIENT=recipient@example.com
   ```
4. **Restart the server** - it will automatically use Gmail when credentials are present

## Deployment

This app can be deployed to any Node.js hosting service like Heroku, Vercel, or Railway.

Make sure to set the environment variables in your deployment platform.