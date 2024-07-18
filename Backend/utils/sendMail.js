const nodemailer = require('nodemailer')

const sendMail = async (email,subject,text) => {
    try {
        console.log()
        const transporter = nodemailer.createTransport({
            service:'gmail',
            port:587,
            secure:true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });
    
    var mailOptions = {
        from : 'noreplyb2b@gmail.com',
        to : email,
        subject : subject,
        text : text
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error) console.log(error);
        else console.log('Email sent: '+info.response);
    });
    }
    catch (error){
        console.log("Error happened")
    }
}

module.exports = sendMail