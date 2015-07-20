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
      return Promise.all([
        Media.find()
          .sort(req.query._sortField + ' '+req.query._sortDir)
          .paginate({page: req.query._page , limit: req.query._perPage }),
        Media.count()
      ])
      .then(function(results) {
        res.set('X-Total-Count',results[1])
        return res.json(results[0]);
      })
    }

    return Media.find(req.query)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  upload: function(req,res) {
    return req.file('file').upload(function (err, data) {
      if(err){
        return res.serverError(err);
      }
      return res.json({
        picturePath: data[0].fd
      });
    })
  }
};

