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
      via: 'trainers',
      dominant: true
    },
    external: {
      type: 'boolean'
    },
    home: {
      type: 'boolean'
    },
    slug: {
      type:'string'
    }
  },
  beforeCreate: function(obj,cb){
    if(obj.user){
      return User.findOne({id:obj.user})
        .then(function(user){
          if(user){
            try{
              obj.displayName = user.displayName;
              obj.email = user.email;
              obj.slug = obj.displayName.toLowerCase().replace(/ /g,'');
              return cb(null,obj);
            }catch(err){
              return cb(err);
            }
          }else{
            cb(new Error('unknown user'));
          }
        })
        .catch(function(err){
          return cb(err);
        });
    }else{
      if(!obj.firstName || !obj.lastName){
       return cb(new Error('missing firstName or lastName attribute'));
      }
      try{
        obj.displayName = obj.firstName +' '+ obj.lastName;
        obj.slug = obj.displayName.toLowerCase().replace(/ /g,'');
        return cb(null,obj);
      }catch(err){
        return cb(err);
      }
    }
  }
};

