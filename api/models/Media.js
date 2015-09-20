/**
* Media.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var fs = require('fs-promise');
var mime = require('mime');
var path = require('path');

module.exports = {

  attributes: {
    url: {
      type: 'string'
    },
    thumb: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    size: {
      type: 'integer'
    },
    description: {
      type: 'string'
    },
    slug: {
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true
    }
  },
  beforeCreate: function(obj, cb) {
    console.log(obj)
    try {
      obj.slug = obj.name.toLowerCase().replace(/ /g, '');
      obj.type = mime.lookup(obj.url);
    } catch (err) {
      cb(err);
    }
    if(obj.description){
      var url = path.resolve(__dirname, '../../.tmp/public/' + obj.url.replace(sails.config.url, ''));
      console.log(url);

      return fs.move(url, path.resolve(__dirname, '../../assets/images/upload/' + obj.name + '.' + mime.extension(obj.type)))
        .then(function () {
          return fs.copy(path.resolve(__dirname, '../../assets/images/upload/' + obj.name + '.' + mime.extension(obj.type)), path.resolve(__dirname, '../../.tmp/public/images/upload/' + obj.name + '.' + mime.extension(obj.type)))
        })
        .then(function () {
          obj.url = sails.config.url + '/images/upload/' + obj.name + '.' + mime.extension(obj.type);
          return cb(null, obj);
        })
        .catch(function (err) {
          return cb(err);
        })
    }else{
      cb(null);
    }
  }
};

