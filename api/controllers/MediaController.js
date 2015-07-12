/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  find: function(req, res) {
    var query = {};

    if (req.query._end && req.query._start) {
      query.limit = req.query._end;
      query.skip = req.query.start;
    }

    if (req.query._sort) {
      query[req.query._sort] = req.query._sortDir; // or 'asc'
    }

    Media
      .find()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(400).json(err);
      })
  }
};

