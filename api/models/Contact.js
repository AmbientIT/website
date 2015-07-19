/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ejs = require('ejs'),
  fs = require('fs');

module.exports = {
  attributes: {
    gender: {
      type: 'string',
      required: true
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string',
      required: true
    },
    displayName: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true
    },
    company: {
      type: 'string'
    },
    tel: {
      type: 'string'
    },
    formations : {
      collection: 'formation',
      via: 'id'
    },
    message : {
      type : 'string',
      required: true
    }
  },
  beforeCreate: function(obj,cb){
    if(obj.firstName){
      obj.displayName = obj.firstName + ' ' + obj.lastName;
    }else{
      obj.displayName =obj.lastName;
    }

    cb(null);
  },
  afterCreate: function(obj,cb){
    return User
      .find()
      .then(function(users){
        var usersMail = users.map(function(user){
          return user.email;
        });

        console.log(usersMail);

        var file = fs.readFileSync(__dirname + '/../../views/email/contact.ejs', 'ascii');
        var html = ejs.render(file, { locals: obj });
        var options = {
          to: usersMail,
          subject: "Nouveau contact sur le site",
          text: html
        };
        return mailer
          .send(options)
      })
      .then(function(result){
        console.log(result)
        return cb(null,result)
      })
      .catch(function(err){
        console.log(err);
        return cb(err);
      });
  }
};
