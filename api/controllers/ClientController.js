/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var clientPromise;

    if(!req.query._page && !req.query._sortDir){
      clientPromise = Client.find(req.query)
    }

    if(req.query._page && !req.query._sortDir){
      clientPromise = Client.find()
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      clientPromise = Client.find()
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      clientPromise.populate('contacts'),
      Client.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Client.findOne({ id: req.params.id })
      .populate('contacts')
      .populate('sessions')
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Client.update({id: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Client.destroy({id:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};

