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
            .paginate({page: req.query._page , limit: req.query._perPage })
            .populate('image')
            .populate('next')
            .populate('previous'),
          Formation.count()
        ])
          .then(function(results) {
            res.set('X-Total-Count',results[1])
            res.json(results[0]);
          })
    }

    return Formation
      .find(req.query)
      .populate('category')
      .populate('next')
      .populate('previous')
      .populate('image')
      .then(function(result){
        result.forEach(function(formation){
          formation.image = 'data:image/png;base64,'+formation.image.file;
        });
        res.json(result);
      })
      .catch(function(err){
        console.log(err);
      })
  }
};

