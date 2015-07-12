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
      if(req.query.avatar){
        var size;
        imageManip
          .resizeAvatar(data[0])
          .then(function(result){
            console.log('eee',result);
            size = result.size;
            return imageManip
              .toBase64(result.path);
          })
          .then(function(base64){
            return Media
              .create({
                file: base64,
                size: size,
                type: data[0].type,
                originalName: data[0].filename
              })
          })
          .then(function(media){
            res.json(media);
          })
          .catch(function(err){
            res.serverError(err);
          })
      }
    })
  }
};

