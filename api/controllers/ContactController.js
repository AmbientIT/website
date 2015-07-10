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
      .populate('formations')
      .then(function(data){
        //console.log(data)
        var response = [];
        data.forEach(function(contact, index){
          response[index] = {
            lastName: contact.lastName,
            firstName: contact.firstName,
            email: contact.email,
            phone: contact.phone,
            message: contact.message
          };
          response[index].formations = contact.formations.map(function(formation){
            return formation.id;
          });

        });
        console.log(response);
        res.json(response);
      })
      .catch(function(err){
        console.log(err);
      })
  }
};

