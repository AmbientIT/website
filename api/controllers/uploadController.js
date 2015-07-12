/**
 * MediaController
 *
 * @description :: Server-side logic for managing upload
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-promise');

module.exports = {
  base64AndCreateMedia : function(req,res){
    req.file('file').upload(function(err,data){
      if(err){
        return res.serverError(err);
      }
      return fs.readFile(data[0].fd)
        .then(function(file){
          return Media.create({
            file: file,
            size: data[0].size,
            type: data[0].type,
            originalName: data[0].filename
          })
        })
        .then(function(media){
          return res.json(media)
        })
        .catch(function(err){
          return res.serverError(err);
        })
    })
  }
};

