/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-promise');
var path = require('path');
var mime = require('mime');

module.exports = {
  find: function(req, res){
    var MediaPromise;

    if(!req.query._page && !req.query._sortDir){
      MediaPromise = Media.find(req.query)
    }

    if(req.query._page && !req.query._sortDir){
      MediaPromise = Media.find()
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      MediaPromise = Media.find()
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      MediaPromise,
      Media.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req, res){
    return Media.findOne({ slug: req.params.id })
      .then(function(result){
        return res.json(result);
      })
    .catch(res.serverError);
  },
  update: function(req, res){
    return Media.update({slug: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
    .catch(res.serverError);
  },
  destroy: function(req,res){
    return Media.destroy({slug:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  },
  upload: function(req,res) {
    return req.file('file').upload(function (err, data) {
      if(err){
        return res.serverError(err);
      }
      var tempFile = path.resolve(__dirname,'../../')+'/.tmp/public/temp/temp.'+mime.extension(data[0].type);
      return fs.exists(tempFile)
        .then(function(exist){
          if(exist){
            return fs.unlink(path.resolve(__dirname,'../../')+'/.tmp/public/temp/temp.'+mime.extension(data[0].type))
          }else {
            return '';
          }
        })
        .then(function(){
          return fs.move(data[0].fd,tempFile)
        })
        .then(function(){
          var url = sails.config.url+tempFile.replace(path.resolve(__dirname,'../../.tmp/public'), '')
          res.json({
            picturePath: url
          })
        })
        .catch(res.serverError)

    })
  }
};

