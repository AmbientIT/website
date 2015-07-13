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
            .paginate({page: req.query._page , limit: req.query._perPage }),
          Contact.count()
        ])
        .then(function(results) {
          res.set('X-Total-Count',results[1])
          res.json(results[0]);
        })
    }

    return Contact
      .find(req.query)
      .then(function(result){
        res.json(result);
      })
      .catch(function(err){
        console.log(err);
      })
  }
};
