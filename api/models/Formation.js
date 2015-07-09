/**
* Formation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    slug: {
      type: 'string'
    },
    category: {
      model: 'category'
    },
    description : {
      type: 'string'
    },
    program : {
      type : 'string'
    },
    slides: {
      type: 'string'
    },
    duration: {
      type: 'integer'
    },
    price: {
      type: 'integer'
    },
    previous: {
      collection: 'formation',
      via: 'previous'
    },
    next: {
      collection: 'formation',
      via: 'next'
    },
    image: {
      type: 'string'
    },
    homePage: {
      type: 'boolean'
    }
  },
  beforeCreate: function(obj,cb){
    obj.slug = obj.name.trim().toLowerCase();
    return cb(null,obj);
  },
  afterCreate: function(obj,cb){
    return Category
      .findOne({id: obj.category})
      .then(function(category) {
        category.formations.push(obj.id);
        return category.save();
      })
      .then(function(result){
        cb(null,result);
      })
      .catch(function(err){
        cb(err);
      })
  }
};

