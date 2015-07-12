/**
* Formation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
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
      via: 'next',
      dominant: true
    },
    next: {
      collection: 'formation',
      via: 'previous'
    },
    image: {
      model: 'media'
    },
    homePage: {
      type: 'boolean'
    }
    //contacts: {
    //  collection: 'contact',
    //  via: 'formations'
    //}
  },
  beforeCreate: function(obj,cb){
    obj.slug = obj.name.toLowerCase().replace(/ /g,'');
    return cb(null,obj);
  },
  afterCreate: function(obj,cb){
    return Category
      .findOne({id: obj.category})
      .then(function(category) {
        category.formations.push(obj);
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

