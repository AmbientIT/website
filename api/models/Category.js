/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description : {
      type : 'string'
    },
    slug: {
      type: 'string'
    },
    formations: {
      collection: 'formation',
      via: 'previous'
    }
  },
  beforeCreate: function(obj,cb){
    obj.slug = obj.name.trim().toLowerCase();
    console.log(obj)
    cb(null,obj);
  }
};

