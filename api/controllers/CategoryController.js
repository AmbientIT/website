/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var CategoryPromise;
    var search = {};
    if(req.query._filters){
      search = JSON.parse(req.query._filters);
    }

    if(!req.query._page && !req.query._sortDir){
      CategoryPromise = Category.find(search)
    }

    if(req.query._page && !req.query._sortDir){
      CategoryPromise = Category.find(search)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      CategoryPromise = Category.find(search)
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      CategoryPromise,
      Category.count()
    ])
    .then(function(results) {
      res.set('X-Total-Count',results[1]);
      return res.json(results[0]);
    })
    .catch(res.serverError)
  },
  findOne: function(req, res){
    return Category.findOne({ slug : req.params.id })
      .populate('formations')
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Category.update({slug: req.params.id},req.body)
      .then(function(result){
        res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Category.destroy({slug:req.params.id})
      .then(function(){
        res.send();
      })
      .catch(res.serverError);
  },
};

