/**
 * SiteControllerController
 *
 * @description :: Server-side logic for managing Sitecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getHomeFormations: function(req,res){
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
  }
};

