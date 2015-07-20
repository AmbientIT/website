/**
* Formation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var fs = require('fs-promise');
var path = require('path');

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
      .then(function(){
        return cb(null,obj);
      })
      .catch(function(err){
        return cb(err);
      })
  },
  afterCreate: function(obj,cb){
    return Category
      .findOne({id: obj.category})
      .then(function(result) {
        result.formations.push(obj);
        return result.save();
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
        result.image ? result.image = 'data:image/png;base64,'+result.image.file : result.image = '/images/formation.logo.jpg';

       return pdfGenerator
           .fromEjs('formation', result, result.slug);
     })
     .then(function(){
       return fs
         .copy(path.resolve(__dirname,'../../assets/pdf/'+obj.slug+'.pdf'), path.resolve( __dirname,'../../.tmp/public/pdf/'+obj.slug+'.pdf'));
     })
     .then(function(){
       return cb(null,obj);
     })
     .catch(function(err){
       return cb(err);
     })
  },
  afterDestroy: function(obj,cb){
    return Promise.all([
      fs
        .unlink(__dirname + '/../../assets/pdf/' + obj[0].slug + '.pdf'),
      fs
        .unlink(__dirname + '/../../.tmp/public/pdf/' + obj[0].slug + '.pdf')
    ])
      .then(function(){
        return cb(null);
      })
      .catch(function(err){
        return cb(err);
      })
  }
};

