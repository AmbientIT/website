/**
 * TrainerController
 *
 * @description :: Server-side logic for managing Trainers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var TrainerPromise;

    if(!req.query._page && !req.query._sortDir){
      TrainerPromise = Trainer.find()
    }

    if(req.query._page && !req.query._sortDir){
      TrainerPromise = Trainer.find()
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      TrainerPromise = Trainer.find()
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      TrainerPromise,
      Trainer.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Trainer.findOne({ slug: req.params.id })
      .populate('formations')
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Trainer.update({slug: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Trainer.destroy({slug:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};

