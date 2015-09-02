/**
 * TrainerController
 *
 * @description :: Server-side logic for managing Trainers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var TrainerPromise;
    var search = {};
    if(req.query._filters){
      search = JSON.parse(req.query._filters);
    }
    if(!req.query._page && !req.query._sortDir){
      TrainerPromise = Trainer.find(search)
    }

    if(req.query._page && !req.query._sortDir){
      TrainerPromise = Trainer.find(search)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      TrainerPromise = Trainer.find(search)
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      TrainerPromise.populate('formations'),
      Trainer.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Trainer.findOne({ id: req.params.id })
      .populate('formations')
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  },
  create: function(req, res){
    if(req.body.user){
      return User.findOne({id:req.body.user})
        .then(function(user){
          if(user){
            req.body.firstName = user.firstName;
            req.body.lastName = user.lastName;
            req.body.displayName = user.displayName;
            req.body.email = user.email;
            return Trainer.create(req.body)
              .then(function(result){
                return res.json(result);
              })
              .catch(res.serverError)
          }else{
            cb(new Error('unknown user'));
          }
        })
        .catch(function(err){
          return cb(err);
        });
    }else if(req.body.contact){
      return Contact.findOne({ id : req.body.contact})
        .populate('formations')
        .then(function(contact){
          if(contact){
            var promises  = [];
            req.body.firstName = contact.firstName;
            req.body.lastName = contact.lastName;
            req.body.displayName = contact.displayName;
            req.body.formations = contact.formations.map(function(formation){
              return formation.slug;
            });
            console.log(req.body);
            req.body.email = contact.email;
            return Trainer.create(req.body)
              .then(function(result){
                return res.json(result);
              })
              .catch(res.serverError)
          }else{
            res.badRequest(new Error('This contact does not exist anymore !'));
          }
        })
        .catch(function(err){
          return res.badRequest(err);
        });
    }
    else{
      if(!req.body.firstName || !req.body.lastName){
        return res.badRequest(new Error('missing firstName or lastName attribute'));
      }
      req.body.displayName = req.body.firstName +' '+ req.body.lastName;
      return Trainer.create(req.body)
        .then(function(result){
          return res.json(result);
        })
        .catch(res.serverError)
    }
    if(!req.body.formations[0]){
      req.body.formations = [];
    }

  },update: function(req, res){
    return Trainer.update({id: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Trainer.destroy({id:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};

