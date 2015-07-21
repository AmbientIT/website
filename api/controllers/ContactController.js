/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise.all([
        Contact.find()
          .populate('formations')
          .sort(req.query._sortField + ' '+req.query._sortDir)
          .paginate({page: req.query._page , limit: req.query._perPage }),
        Contact.count()
      ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
    }

    return Contact.find(req.query)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  findOne: function(req, res){
    return Contact.findOne({ slug : req.params.id })
      .populate('formations')
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Contact.destroy({slug:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};
