/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Project
            .find()
            .sort(req.query._sortField + ' '+req.query._sortDir)
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Project.count()
        ])
        .then(function(results) {
          res.set('X-Total-Count',results[1])
          return res.json(results[0]);
        })
    }

    return Project
      .find(req.query)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  }
};

