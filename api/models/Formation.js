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
    var promises = [];
    if(obj.previous){
      obj.previous.forEach(function(formation){
        console.log(formation)
        promises.push(Formation.findOne({id:formation}))
      });
    }
    return Promise
      .all(promises)
      .then(function(result){
        promises = [];
        result.forEach(function(formation){
          formation.next.push(obj.id);
          promises.push(formation.save());
        });
        return Promise.all(promises);
      })
      .then(function(result){
        return cb(null,obj);
      })
      .catch(function(err){
        return cb(err);
      })
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

