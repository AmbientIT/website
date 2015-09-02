/**
 * SiteControllerController
 *
 * @description :: Server-side logic for managing Sitecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-promise');
var path = require('path');

module.exports = {
	homePage: function(req,res){
    return Promise.all([
      Formation.find({
        home: true,
        published: true
      }),
      User.find()
    ])
      .then(function(result){
        res.locals.layout = 'layouts/default';
        return res.view('site/home',{
          content: {
            title: 'Centre de formation, Délégation de formateurs, Developpement d\'applications sur mesures'
          },
          formations : result[0],
          users : result[1]
        })
      })
      .catch(res.serverError);
  },
  formationsPage: function(req,res) {
    return Formation.find({published : true })
      .populate('category')
      .then(function(result){
        var categories = [];
        result.forEach(function(formation,index){
          categories.push(formation.category);
          categories[index].formations = [];
        });
        categories = _.uniq(categories, 'name');

        result.forEach(function(formation){
          categories.forEach(function(category){
            if(category.name === formation.category.name){
              category.formations.push(formation);
            }
          });
        });
        return res.view('site/formations',{
          content: {
            title: 'Nos formations'
          },
          categories : categories
        })
      })
      .catch(res.serverError);
  },
  formationPage: function(req,res){
    return Formation.findOne({slug : req.params.slug})
      .populate('category')
      .populate('next')
      .populate('previous')
      .then(function(result){
        return res.view('site/formation',{
          content: {
            title: result.name
          },
          formation: result
        })
      })
      .catch(res.serverError)
  }
};

