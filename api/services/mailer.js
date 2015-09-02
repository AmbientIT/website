var MailerService = require('sails-service-mailer');

module.exports = MailerService.create(sails.config.email.service, {
  from: sails.config.email.from ,
  transporter: {
    port: sails.config.email.port,
    host: sails.config.email.host
  }
});
