'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodemailer = require('nodemailer');

_dotenv2.default.load();
/**
 * @description This function is used  to send email
 * @param {string} email
 * @param {string} hash
 * @param {string} headers
 * @return {void}
 */
var sendMail = function sendMail(email, hash, headers) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.PASS
    }
  });
  var emailOptions = {
    subject: 'Reset Password!',
    from: 'IdeaBox',
    to: email,
    html: '<div style="width: 100%; background-color: #f2f2f7; padding: 2%;">\n  <link rel="icon" type="image/png" href="https://res.cloudinary.com/dannytebj/image/upload/v1512563991/favicon-32x32_o9wh94.png" sizes="16x16" />\n  <div style="width: 60%; background-color: white; margin: auto;">\n    <div style="height:40px; background-color:teal ; width:100%">\n      <center><h2 style="padding-top: 7px; color: #f2f2f2;">IdeaBox</h2>\n      </center>\n    </div>\n    <div style="padding: 8%">\n      <div class="row">\n        <p>You recently requested a password reset for this account</p>\n        <p>Please click on the button bellow to update your password <br/><br/>\n          <a style="background-color: \n        teal; padding: 10px;cursor: pointer; color: #f2f2f2;\n         text-decoration: none;" \n        href="https://' + headers + '/updatepassword/' + hash + '">Update Password</a></p>\n        <div style="border-top: 3px solid teal ;"></div>\n        <p style="font-weight: bold; color: #004d40 ">The IdeaBox Team</p>\n      </div>\n    </div>\n  </div>\n</div>'
  };

  transporter.sendMail(emailOptions, function (error, info) {
    if (error) {
      return console.log(error); // eslint-disable-line
    }
    console.log(info.response); // eslint-disable-line
  });
};
exports.default = sendMail;