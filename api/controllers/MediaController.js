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
      .catch(res.serverError);
    }

    return Media.find(req.query)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
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
      return res.json({
        picturePath: data[0].fd
      });
    })
  }
};

