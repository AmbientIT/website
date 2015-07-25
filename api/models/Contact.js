/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ejs = require('ejs');
var fs = require('fs');

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
    slug: {
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true
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
    }
  },
  beforeCreate: function(obj,cb){
    if(obj.firstName){
      obj.displayName = obj.firstName + ' ' + obj.lastName;
    }else{
      obj.displayName =obj.lastName;
    }
    try{
      obj.slug = obj.name.toLowerCase().replace(/ /g,'');
      return cb(null,obj);
    }catch(err){
      return cb(err);
    }
  },
  afterCreate: function(obj,cb){
    return User.find()
      .then(function(users){
        var usersMail = users.map(function(user){
          return user.email;
        });
        var file = fs.readFileSync(__dirname + '/../../views/email/contact.ejs', 'ascii');
        var html = ejs.render(file, { locals: obj });
        var options = {
          to: usersMail,
          subject: "Nouveau contact sur le site",
          html: html
        };
        return mailer.send(options)
      })
      .then(function(result){
        return cb(null,result)
      })
      .catch(function(err){
        return cb(err);
      });
  }
};
