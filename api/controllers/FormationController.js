/**
 * FormationController
 *
 * @description :: Server-side logic for managing Formations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Formation
            .find()
            .sort(req.query._sortField + ' '+req.query._sortDir)
            .paginate({page: req.query._page , limit: req.query._perPage })
            .populate('category')
            .populate('next')
            .populate('previous')
            .populate('trainers'),
          Formation.count()
        ])
          .then(function(results) {
            res.set('X-Total-Count',results[1]);
            return res.json(results[0]);
          })
        .catch(res.serverError);
    }

    return Formation
      .find(req.query)
      .populate('category')
      .populate('next')
      .populate('previous')
      .populate('trainers')
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  findOne: function(req, res){
    return Formation
      .findOne({ id : req.params.id })
      .populate('next')
      .populate('previous')
      .populate('trainers')
      .then(function(result){
        return res.json(result);
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
            base64: base64
          });
        })
        .catch(res.serverError)
    })
  }
};

