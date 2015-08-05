/**
* Students.js
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
    sessions: {
      collection: 'session',
      via: 'students'
    },
    slug: {
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true
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
  }
};

