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
    var search = {};
    if(req.query._filters){
      search = JSON.parse(req.query._filters);
    }

    if(!req.query._page && !req.query._sortDir){
      MediaPromise = Media.find(search)
    }

    if(req.query._page && !req.query._sortDir){
      MediaPromise = Media.find(search)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      MediaPromise = Media.find(search)
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
  destroy: function(req,res) {
    return Media.findOne({slug: req.params.id})
      .then(function(media){
        return Promise.all([
          fs.unlink(media.url.replace(sails.config.url, path.resolve(__dirname,'../../assets/'))),
          fs.unlink(media.url.replace(sails.config.url, path.resolve(__dirname,'../../.tmp/public/')))
        ])
      })
      .then(function(){
        return Media.destroy({slug:req.params.id})
      })
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);

  },

  upload: function(req,res) {
    return req.file('file').upload(function (err, data) {
      if(err){
        return res.serverError(err);
      }else if(req.query.froala){
        console.log(data[0]);
        return fs.move(data[0].fd, path.resolve(__dirname,'../../.tmp/public/images/upload/'+data[0].filename))
          .then(function(){
            return fs.copy(path.resolve(__dirname,'../../.tmp/public/images/upload/'+data[0].filename),path.resolve(__dirname,'../../assets/images/upload/'+data[0].filename))
          })
          /*.then(function(){
            return Promise.all([
              imageManip.thumbnailize(__dirname,'../../.tmp/public/images/upload/'+data[0].filename, __dirname,'../../.tmp/public/images/upload/'+data[0].filename+'.thumb.'+mime.extension(data[0].type)),
              imageManip.thumbnailize(__dirname,'../../assets/images/upload/'+data[0].filename, __dirname,'../../assets/images/upload/'+data[0].filename+'.thumb.'+mime.extension(data[0].type))
            ])
          })*/
          .then(function(){
            return Media.create({
              name: data[0].filename,
              url : sails.config.url+'/images/upload/'+data[0].filename,
              //thumb :sails.config.url+'/images/upload/'+data[0].filename+'.thumb.'+mime.extension(data[0].type)
              thumb :sails.config.url+'/images/upload/'+data[0].filename
            });
          })
          .then(function(result){
            console.log(result)
            res.json(result);
          })
          .catch(res.serverError);
      }else{
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
            var url = sails.config.url+tempFile.replace(path.resolve(__dirname,'../../.tmp/public'), '');
            res.json({
              picturePath: url
            })
          })
          .catch(res.serverError)
      }
    })
  }
};

