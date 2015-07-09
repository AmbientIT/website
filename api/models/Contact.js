/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName:{
      type: 'string',
      required: true
    },
    company: {
      type: 'string',
      required: true
    },
    tel: {
      type: 'string'
    },
    formations : {
      type: 'array'
    },
    message : {
      type : 'string',
      required: true
    }
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