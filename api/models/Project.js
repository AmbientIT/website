/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:  {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      required: true
    },
    picture: {
      model: 'media'
    },
    creator: {
      model: 'user',
      required: true
    },
    slug: {
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true
    },
    published: {
      type: 'boolean'
    }
  },
  beforeCreate: function(obj,cb){
    try{
      obj.slug = obj.name.toLowerCase().replace(/ /g,'');
      return cb(null,obj);
    }catch(err){
      return cb(err);
    }
  }
};

