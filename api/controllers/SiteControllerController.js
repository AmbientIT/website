/**
 * SiteControllerController
 *
 * @description :: Server-side logic for managing Sitecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	homePage: function(req,res){
    Formation
      .find({
        home: true
      })
      .then(function(result){
        res.locals.layout = 'layouts/default';
        res.view('site/home',{
          formations : result
        })
      })
  },
  formationsPage: function(req,res) {
    Category
      .find()
      .populate('formations')
      .then(function(result){
        console.log(result)
        res.view('site/formations',{
          categories : result
        })
      })
  },
  formationSearch: function(req, res){
    console.log(req.query.q)
    Formation
      .countAndSearch(req.query.q)
      .then(function(result){
        res.view('site/formations-search',{
          formations : result.data
        })
      });
  },
  formationPage: function(req,res){

  }
};

