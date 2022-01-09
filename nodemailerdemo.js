const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:"Gmail",
    secure: true,
    auth: {
        user:"vyshnavunni25@gmail.com",
        pass:"9847644201"

    },
    tls : { rejectUnauthorized: false }

})

const options = {
    from:"vyshnavunni25@gmail.com",
    to:"unnivyshnav@gmail.com",
    subject:"Nodemailer",
    text:"WOW..!!! It's working!!!!"
}

transporter.sendMail(options, function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent:" +info.response)
})