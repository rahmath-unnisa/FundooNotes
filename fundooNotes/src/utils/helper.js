import dotenv from 'dotenv';
dotenv.config()

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '682053069977-n3u6cprr8iosjhrgp2jlcqos12mcrtks.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFREST_TOKEN = '1//04ja2jA5Z1RS4CgYIARAAGAQSNwF-L9Ir6Lbay8jN5CzjesOSOU0bJLkHDouAJMyJitUcy_zb9Cb06tTwQMMmHWhcpimfOT7hsKc'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFREST_TOKEN })

export async function sendMail(email,token) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: 'asfiarehmath@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFREST_TOKEN,
                accessToken: accessToken
            }

        });
        const mailOptions = {
            from: 'RAHMATH <asfiarehmath@gmail.com>',
            to: email ,
            subject: 'Reset password link',
            text: 'Hello ',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:7000/${token}">click here</a></h1>`,
        };
        const result = await transport.sendMail(mailOptions)
        return result

    } catch (error) {
        return error
    }
}
sendMail()
.then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));

