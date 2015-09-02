/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var ContactPromise;
    var search = {};
    if(req.query._filters){
      search = JSON.parse(req.query._filters);
    }

    if(!req.query._page && !req.query._sortDir){
      ContactPromise = Contact.find(search)
    }

    if(req.query._page && !req.query._sortDir){
      ContactPromise = Contact.find(search)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      ContactPromise = Contact.find(search)
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      ContactPromise,
      Contact.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req, res){
    return Contact.findOne({ id : req.params.id })
      .populate('formations')
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Contact.destroy({id:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};
