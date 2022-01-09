var mail=document.getElementById("email");
var mailfb=document.getElementById("emailfeedback");

function validate(){
    var myMail=mail.value;
    var regMail= /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{1,3})([.a-zA-Z]{2,10})$/;

    if(regMail.test(myMail)){

        mailfb.innerHTML="Valid E-mail Id.";
        mailfb.style.color="green";
        mailfb.style.visibility-"visible";
    } else{
        mailfb.style.visibility="visible";
        return false;

    }


}