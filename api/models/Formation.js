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
    avatar: {
      type: 'string'
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
    published: {
      type: 'boolean'
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
    try{
      obj.slug = obj.name.toLowerCase().replace(/ /g,'');
      obj.avatar ? obj.avatar = 'data:image/png;base64,' + obj.avatar : obj.avatar = sails.config.url + '/images/formation.logo.jpg';
    }catch(err){
      cb(err);
    }
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
     .populate('trainers')
     .then(function(result) {
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

