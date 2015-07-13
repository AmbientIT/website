/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-promise');

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Media
            .find()
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Media.count()
        ])
        .then(function(results) {
          res.set('X-Total-Count',results[1])
          return res.json(results[0]);
        })
    }

    return Media
      .find(req.query)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  base64AndCreate : function(req,res){
    req.file('file').upload(function(err,data){
      if(err){
        return res.serverError(err);
      }
      if(req.query.avatar){
        var size;
        return imageManip
          .resizeAvatar(data[0])
          .then(function(result){
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
          .then(res.json)
          .catch(res.serverError)
      }
    })
  }
};

