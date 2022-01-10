const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '850771347684-559v5609i57ha994pdjiqljt56on9b6h.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//045YPmdmmtzWICgYIARAAGAQSNwF-L9IrLqzMn-g1nNSMj2JloBXnEK9ke9M6eJZu68xc8EO_yBEofU3k5FLmN_ZAAieQ02EvSuA';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'kuvyshnav@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls : { rejectUnauthorized: false }
    });

    const mailOptions = {
      from: 'SENDER NAME <kuvyshnav@gmail.com>',
      to: 'unnivyshnav@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message)); 