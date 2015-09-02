/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ejs = require('ejs');
var fs = require('fs');
var clone = require('node-clone');

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
      via: 'slug',
      dominant: true
    },
    message : {
      type : 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    prestation: {
      type: 'string'
    },
    client: {
      model: 'Client'
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
    var usersMail;
    return User.find()
      .then(function(users){
        usersMail = users.map(function(user){
          return user.email;
        });
        return Contact.findOne({ id : obj.id })
          .populate('formations')
      })
      .then(function(contact){
        var file = fs.readFileSync(__dirname + '/../../views/email/contact/'+obj.type+'.ejs', 'ascii');
        var html = ejs.render(file, { locals: {
          contact: contact,
          config: sails.config
        }});
        var options = {
          to: usersMail,
          subject: "Nouveau contact sur le site",
          html: html
        };
        return mailer.send(options);
      })
      .then(function(result){
        return cb(null,result)
      })
      .catch(function(err){
        console.log(err);
        return cb(err);
      });
  }
};
