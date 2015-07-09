/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var jwt = require('jwt-simple'),
  bcrypt = require('bcryptjs'),
  moment = require('moment');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      unique: true,
      lowercase: true
    },
    password: {
      type: 'string',
      select: false
    },
    displayName: {
      type: 'string'
    },
    picture: {
      type: 'string'
    },
    google:{
      type: 'string'
    },
    tokenify: function(){
      var payload = {
        sub: this.id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
      };
      return jwt.encode(payload, sails.config.TOKEN_SECRET);
    },
    comparePassword: function(password){
      return new Promise(function(resolve,reject){
        bcrypt.compare(password, this.password, function(err, isMatch) {
          if(err){
            reject(err);
          }else{
            resolve();
          }
        });
      })
    },
    beforeCreate: function(next){
      var user = this;
      if (!user.isModified('password')) {
        return next();
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash;
          if(err){
            next(err);
          }else{
            next(null);
          }
        });
      });
    }
  }
};

