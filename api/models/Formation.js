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
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true
    },
    category: {
      model: 'category',
      required: true
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
      if(!obj.avatar)
        obj.avatar = sails.config.url + '/images/formation/logo.jpg';
    }catch(err){
      cb(err);
    }
    var promises = [];
    if(obj.previous){
      obj.previous.forEach(function(formation){
        promises.push(Formation.findOne({slug:formation}).populate('next'))
      });
    }
    return Promise
      .all(promises)
      .then(function(result){
        promises = [];
        result.forEach(function(formation){
          formation.next ? formation.next.push(obj.slug) : formation.next = [];
          promises.push(formation.save());
        });
        return Promise.all(promises);
      })
      .then(function(){
        return cb(null,obj);
      })
      .catch(function(err){
        console.error(err);
        return cb(err);
      })
  },
  afterCreate: function(obj,cb){
    return Category
      .findOne({slug: obj.category})
      .populate('formations')
      .then(function(result) {
        result.formations ? result.formations.push(obj.slug) : result.formations = [obj.slug];
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
     .findOne({slug:obj.slug})
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

