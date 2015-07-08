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
      .then(function(data){
        res.locals.layout = 'layouts/default';
        res.view('site/home',{
          formations : data
        })
      })
  },
  formationsPage: function(req,res){
    Category
      .find()
      .populate('formations')
      .then(function(data){
        console.log(data);
        res.view('site/formations',{
          categories : data
        })
      })
  },
  formationPage: function(req,res){

  }
};

