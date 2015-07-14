/**
* Trainer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    displayName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    price: {
      type: 'integer'
    },
    user: {
      model: 'User'
    },
    formations: {
      collection: 'formation',
      via: 'trainer',
      dominant: true
    },
    external: {
      type: 'boolean'
    },
    home: {
      type: 'boolean'
    }
  },
  beforeCreate: function(obj,cb){
    if(obj.user){
      return User
        .findOne({id:obj.user})
        .then(function(user){
          if(user){
            obj.displayName = user.displayName;
            obj.email = user.email;
            return cb(null,obj);
          }
        })
        .catch(function(err){
          return cb(err);
        });
    }else{
      if(!obj.firstName || !obj.lastName){
       return cb(new Error('missing firstName or lastName attribute'));
      }
      obj.displayName = obj.firstName +' '+ obj.lastName;
      return cb(null,obj);
    }
  }
};

