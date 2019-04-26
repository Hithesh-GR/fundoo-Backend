/********************************************************************************************
 *  @Purpose        : Create nodemailer to allow easy as cake email sending . 
 *  @file           : nodemailer.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ********************************************************************************************/
const nodemailer = require('nodemailer');
/**
 * @description:* Here we are configuring our SMTP Server details.
                * SMTP is mail server which is responsible for sending and recieving email.
                * Used for forgotPassword
 * @param {*sent url to gmail} url 
 */
exports.sendEMailFunction = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
    });
    const mailOptions = {
        from: process.env.email, // sender address
        to: process.env.email,  // list of receivers
        subject: 'Fundoo-Notes Reset Password Link', // Subject line
        text: 'Your Email verification link is:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log('error while sending mail==> ', err);
        else
            console.log('result on sending mail==> ', info);
    });
}
/**
 * @description:* Here we are configuring our SMTP Server details.
                * SMTP is mail server which is responsible for sending and recieving email.
                * Used for collaborators
 * @param {*sent url to gmail} url 
 */
exports.sendEMailFunctionForCollaborator = (url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
    });
    const mailOptions = {
        from: process.env.email, // sender address
        to: process.env.email,  // list of receivers
        subject: 'Fundoo-Notes', // Subject line
        text: 'Collaborator:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log('error while sending mail==> ', err);
        else
            console.log('result on sending mail==> ', info);
    });
}

