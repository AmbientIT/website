/**
 * FormationController
 *
 * @description :: Server-side logic for managing Formations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var FormationPromise;
    var search = {};
    if(req.query._filters){
      search = JSON.parse(req.query._filters);
    }

    if(!req.query._page && !req.query._sortDir){
      FormationPromise = Formation.find(search)
        .populate('next')
        .populate('previous')
        .populate('trainers')
    }

    if(req.query._page && !req.query._sortDir){
      FormationPromise = Formation.find(search)
        .populate('next')
        .populate('previous')
        .populate('trainers')
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      FormationPromise = Formation.find(search)
        .populate('next')
        .populate('previous')
        .populate('trainers')
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      FormationPromise,
      Formation.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)


  },
  findOne: function(req, res){
    return Formation
      .findOne({ slug : req.params.id })
      .populate('next')
      .populate('previous')
      .populate('trainers')
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Formation.update({slug: req.params.id},req.body)
      .then(function(result){
        res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Formation.destroy({slug:req.params.id})
      .then(function(){
        res.send();
      })
      .catch(res.serverError);
  },
  transformAvatar: function (req, res) {
    return req.file('file').upload(function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      var size;
      return imageManip.resizeAvatar(data[0])
        .then(function (result) {
          size = result.size;
          return imageManip
            .toBase64(result.path);
        })
        .then(function (base64) {
          res.json({
            base64: 'data:image/png;base64,'+base64
          });
        })
        .catch(res.serverError)
    })
  }
};

