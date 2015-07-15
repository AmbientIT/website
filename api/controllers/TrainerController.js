/**
 * TrainerController
 *
 * @description :: Server-side logic for managing Trainers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Trainer
            .find()
            .populate('formations')
            .sort(req.query._sortField + ' '+req.query._sortDir)
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Trainer.count()
        ])
        .then(function(results) {
          results[0].forEach(function(trainer){
            trainer.price = parseInt(trainer.price);
          });
          res.set('X-Total-Count',results[1]);
          res.json(results[0]);
        })
        .catch(res.serverError);
    }

    return Trainer
      .find(req.query)
      //.populate('formations')
      .then(function(result){
        console.log(result);
        return res.json(result);
      })
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Trainer
      .findOne({ id: req.params.id })
      .populate('formations')
      .populate('user')
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  }
};

