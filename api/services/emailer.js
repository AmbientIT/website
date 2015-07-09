var nodemailer = require("nodemailer");
var fs = require("fs");


var transporter = nodemailer.createTransport({
  service: sails.config.email.provider,
  auth: {
    user: sails.config.email.address,
    pass: sails.config.email.pass
  }
});

module.exports = {
  send : function(options){
    console.log(options)
    var mailOptions = {
      from: 'AmbientIT.net <charles.jacquin@ambient-it.net>', // sender address
      to: options.to.toString(), // list of receivers
      subject: options.subject, // Subject line
      text: 'Hello world ✔', // plaintext body
      html: '<b>Hello world ✔</b>' // html body
    };
    return new Promise(function(resolve, reject){
      transporter.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err);
          return reject(err);
        }
        console.log('Message sent: ' + info.response);
        return resolve(info.response);
      });
    })

  }
};