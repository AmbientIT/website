/**
* Formation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var fs = require('fs-promise');

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
    trainers: {
      collection: 'trainer',
      via: 'formations'
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
        promises.push(Formation.findOne({id:formation.id}).populate('next'))
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
    return Promise.all([
      Category
        .findOne({id: obj.category}),
      Formation
        .findOne({id:obj.id})
        .populate('next')
        .populate('previous')
        .populate('image')
        .populate('trainers')
      ])
      .then(function(results) {
        if(results[1].image.file){
          results[1].image = 'data:image/png;base64,'+results[1].image.file;
        }else{
          results[1].image = '/images/formation.logo.jpg'
        }
        results[0].formations.push(obj);
        return Promise.all([
          pdfGenerator.fromEjs('formation', results[1], results[1].slug),
          results[0].save()
        ])
      })
      .then(function(){
        return cb(null,obj);
      })
      .catch(function(err){
        return cb(err);
      })
  },
  afterUpdate: function(obj, cb){
   return  Formation
     .findOne({id:obj.id})
     .populate('next')
     .populate('previous')
     .populate('image')
     .populate('trainers')
     .then(function(result) {
       if(result.image.file){
         result.image = 'data:image/png;base64,'+result.image.file;
       }else{
         result.image = '/images/formation.logo.jpg'
       }
       return pdfGenerator
         .fromEjs('formation', result, result.slug);
     })
     .then(function(){
       return cb(null,obj);
     })
     .catch(function(err){
       return cb(err);
     })
  },
  afterDestroy: function(obj,cb){
    console.log(obj);
    return fs
      .unlink(__dirname + '/../../assets/pdf/' + obj[0].slug + '.pdf')
      .then(function(){
        return cb(null);
      })
      .catch(function(err){
        return cb(err);
      })
  }
};

