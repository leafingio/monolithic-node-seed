
var nodemailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');
var sesTransport = require('nodemailer-ses-transport');

var decideTransport = () => {
    /* istanbul ignore else */
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_EMAIL_TRANSPORT'] == 'test') {
       return stubTransport();
    } else if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_EMAIL_TRANSPORT'] == 'ses'){
        return sesTransport({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            rateLimit: 5 // do not send more than 5 messages in a second
        });
    } else if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_EMAIL_TRANSPORT'] == 'gmail'){
        return {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASS
            }
        };
    }
}

var transporter = nodemailer.createTransport(decideTransport());

module.exports = (data, callback) => {
    var mailOptions = {
        from: data.from || process.env.DEFAULT_EMAIL_FROM,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        text: data.text,
        html: data.html,
        attachments: data.attachments
    }
    transporter.sendMail(mailOptions, callback)
}