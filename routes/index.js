var express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
var router = express.Router();

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



router.get('/', function(req, res) {
  res.render('index');
});

router.get('/home', function(req,res){
  res.render('home')
})

router.post('/mailer',function(req,res){
  
  const mailid= req.body.email;
  const message= req.body.message;
  console.log(mailid)
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
        from: 'Vyshnav K U <kuvyshnav@gmail.com>',
        to: mailid,
        subject: 'Hello from gmail using API',
        text: message,
        // html: '<h3>{message}</h3>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  sendMail()
    .then((result) => res.render('response',{Heading :'Mail Sent Succesfully'}))
    .catch((error) => res.render('response',{Heading :'Something Went Wrong'})); 

//   const transporter = nodemailer.createTransport({
//     service:"Gmail",
//     secure: true,
//     auth: {
//         user:"vyshnavunni25@gmail.com",
//         pass:"9847644201"

//     },
//     tls : { rejectUnauthorized: false }

// })



// const options = {
//     from:"vyshnavunni25@gmail.com",
//     to:mail,
//     subject:"Nodemailer",
//     text:message
// }

// transporter.sendMail(options, function(err,info){
//     if(err){
//         console.log(err);
//         res.render('response',{Heading :'Something Went Wrong'})
//         return;
//     }
//     console.log("Sent:" +info.response)
//     res.render('response',{Heading :'Mail Sent Successfully'})
// })


})

module.exports = router;

