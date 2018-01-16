
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport( {
  host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: gmailEmail,
            pass: gmailPassword
        }
});

exports.sendEmail = functions.firestore.document('posts/{userID}').onCreate(event => {

  const data = event.data.data();
  const content = data.content;
  const email = data.email;
  console.log(content);

  return sendEmail(email, content);

});

function sendEmail(email, content) {
  const mailOptions = {
    from: 'Webarq Portfolio <ark.mierzejewski@gmail.com>',
    to: 'nedar3@gmail.com'
  };

  mailOptions.subject = `Webarq - Wiadomość od ${email}`;
  mailOptions.text = 

`Wiadomość od: ${email}
  
Treść wiadomości: 

${content}`;


  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New email sent to you!');
  });
}


exports.sendReply = functions.firestore.document('posts/{userID}').onCreate(event => {
  
    const data = event.data.data();
    const email = data.email;
  
    return sendNotification(email);
  
  });
  
  function sendNotification(email) {

    const mailOptions = {
      from: 'Webarq Portfolio <ark.mierzejewski@gmail.com>',
      to: email
    };
  
    mailOptions.subject = `Webarq - Dziękuję za wiadomość!`;
    mailOptions.text = 

`Dziękuję za kontakt, z pewnością odpowiem na wiadomość w najbliższym czasie,
    

Z wyrazami szacunku,

Arkadiusz Mierzejewski`;
  
  
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New email sent to sender!');
    });
  }