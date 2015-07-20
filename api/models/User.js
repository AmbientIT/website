/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      unique: true,
      lowercase: true
    },
    description: {
      type: 'string'
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
      try{
        return jwt.encode(payload, sails.config.TOKEN_SECRET);
      }catch(err){
        throw err;
      }
    }
  }
};

