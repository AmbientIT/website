/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOne: function(req, res){
    Page.findOne({title : req.params.title})
      .populate('components')
      .then(function(data){
        console.log(data);
        res.json(data);
      })
  },
  findAll: function(req, res){
    Page.find()
      .then(function(data){
        res.json(data);
      })
  }
};

