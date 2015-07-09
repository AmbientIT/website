/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var query = {};

    if(req.query._end && req.query._start){
      query.limit = req.query._end;
      query.skip = req.query.start;
    }

    if(req.query._sort){
      query[req.query._sort] = req.query._sortDir; // or 'asc'
    }

    Contact
      .find()
      .then(function(data){
        res.json(data);
      })
      .catch(function(err){
        console.log(err);
      })
  }
};

