/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
      obj.displayName = obj.gender+ ' ' +obj.firstName + ' ' + obj.lastName;
    }else{
      obj.displayName = obj.gender + ' '+ obj.firstName;
    }

    cb(null);
  },
  afterCreate: function(obj,cb){
    User
      .find()
      .then(function(users){
        var usersMail = _.map(users, function(user){
          return user.email;
        });
        var options = {
          to: usersMail,
          subject: "Nouveau contact sur le site"
        };
        emailer
          .send(options)
          .then(function(){
            cb(null);
          })
          .catch(function(err){
            console.log('mail err',err)
            cb(err);
          });

      });
  }
};
