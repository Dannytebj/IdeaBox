import dotenv from 'dotenv';

const nodemailer = require('nodemailer');

dotenv.load();
/**
 * @description This function is used  to send email
 * @param {string} email
 * @param {string} hash
 * @param {string} headers
 * @return {void}
 */
const sendMail = (email, hash, headers) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.PASS,
    },
  });
  const emailOptions = {
    subject: 'Reset Password!',
    from: 'IdeaBox',
    to: email,
    html: `<div style="width: 100%; background-color: #f2f2f2; padding: 2%;">
  <div style="width: 60%; background-color: white; margin: auto;">
    <div style="height:40px; background-color: #43A047 ; width:100%">
      <center><h2 style="padding-top: 7px; color: #f2f2f2;">Post-it</h2>
      </center>
    </div>
    <div style="padding: 8%">
      <div class="row">
        <p>You recently requested a password reset for this account</p>
        <p>Please follow this link to update your password<a style="background-color: 
        #43A047; padding: 10px;cursor: pointer; color: #f2f2f2;
         text-decoration: none;" 
        href="http://${headers}/api/v1/user/updatePassword/${hash}">Go to Post-it</a></p>
        <div style="border-top: 3px solid #43A047 ;"></div>
        <p style="font-weight: bold; color: #004d40 ">The PostIt Team</p>
      </div>
    </div>
  </div>
</div>`,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
          return console.log(error);  // eslint-disable-line
    }
        console.log(info.response);  // eslint-disable-line
  });
};
export default sendMail;
