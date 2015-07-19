var MailerService = require('sails-service-mailer');

module.exports = MailerService.create(sails.config.email.service, {
  from: sails.config.email.from ,
  transporter: {
    auth: {
      api_user: sails.config.email.auth.user,
      api_key: sails.config.email.auth.pass
    }
  }
});
