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
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Trainer.count()
        ])
        .then(function(results) {
          res.set('X-Total-Count',results[1]);
          res.json(results[0]);
        })
        .catch(res.serverError);
    }

    return Trainer
      .find(req.query)
      .populate('formations')
      .then(res.json)
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Trainer
      .findOne({ id: req.params.id })
      .populate('user')
      .populate('formations')
      .then(function(trainer){
        trainer.user = trainer.user.id;
        return res.json(trainer);
      })
      .catch(res.serverError);
  }
};

