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
          content: {
            title: 'Centre de formation, Délégation de formateurs, conseil'
          },
          formations : result
        })
      })
  },
  formationsPage: function(req,res) {
    Category
      .find()
      .populate('formations')
      .then(function(result){
        res.view('site/formations',{
          content: {
            title: 'Nos formations'
          },
          categories : result
        })
      })
  },
  formationSearch: function(req, res){
    Formation
      .countAndSearch(req.query.q)
      .then(function(result){
        res.view('site/formations-search',{
          title: 'Resultats de la recherche',
          formations : result.data
        })
      });
  },
  formationPage: function(req,res){
    Formation
      .findOne({slug : req.params.slug})
      .populate('category')
      .populate('next')
      .populate('previous')
      .then(function(result){
        console.log(result);
        res.view('site/formation',{
          content: {
            title: result.name
          },
          formation: result
        })
      })
  }
};
