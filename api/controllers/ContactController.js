/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Contact
            .find()
            .populate('formations')
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Contact.count()
        ])
        .then(function(results) {
          res.set('X-Total-Count',results[1]);
          return res.json(results[0]);
        })
    }

    return Contact
      .find(req.query)
      .then(res.json)
      .catch(res.serverError);
  }
};
