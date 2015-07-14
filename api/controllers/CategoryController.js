/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Category
            .find()
            .populate('formations')
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Category.count()
        ])
        .then(function(results) {
          res.set('X-Total-Count',results[1]);
          return res.json(results[0]);
        })
        .catch(res.serverError)
    }

    return Category
      .find(req.query)
      .populate('formations')
      .then(res.json)
      .catch(res.serverError);
  }
};

