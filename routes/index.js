var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index');
});

router.get('/home', function(req,res){
  res.render('home')
})

router.post('/home',function(req,res){
  
  const mail= req.body.email;
  const message= req.body.message;
  console.log(mail)

  const transporter = nodemailer.createTransport({
    service:"hotmail",
    secure: false,
    requestCert:false,
    auth: {
        user:"unnivyshnav@hotmail.com",
        pass:"suttualwaysrockzA"

    },
    tls : { rejectUnauthorized: false }

})



const options = {
    from:"unnivyshnav@hotmail.com",
    to:mail,
    subject:"Nodemailer",
    text:message
}

transporter.sendMail(options, function(err,info){
    if(err){
        console.log(err);
        res.send("Something Went Wrong")
        return;
    }
    console.log("Sent:" +info.response)
    res.send("Mail sent successfully")
})


})

module.exports = router;
