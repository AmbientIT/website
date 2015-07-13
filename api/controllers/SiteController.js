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
      .populate('image')
      .then(function(result){
        result.forEach(function(formation,index){
          formation.image = 'data:image/png;base64,'+formation.image.file;
        });
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
    Formation
      .find()
      .populate('category')
      .populate('image')
      .then(function(result){
        var categories = [];
        result.forEach(function(formation,index){
          categories.push(formation.category);
          categories[index].formations = [];
        });
        categories = _.uniq(categories, 'name');

        result.forEach(function(formation){
          formation.image = 'data:image/png;base64,'+formation.image.file;
          categories.forEach(function(category){
            if(category.name === formation.category.name){
              category.formations.push(formation);
            }
          });
        });
        res.view('site/formations',{
          content: {
            title: 'Nos formations'
          },
          categories : categories
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
      .populate('image')
      .populate('next')
      .populate('previous')
      .then(function(result){
        result.image = 'data:image/png;base64,' + result.image.file;
        var nextPromises = [];
        var previousPromise = [];
        result.previous.forEach(function(formation){
          previousPromise.push(Formation.findOne({id:formation.id}).populate('image'))
        });
        result.next.forEach(function(formation){
          nextPromises.push(Formation.findOne({id:formation.id}).populate('image'))
        });
        Promise
          .all([Promise.all(previousPromise),Promise.all(nextPromises)])
          .then(function(data){
            result.previous = data[0];
            result.next = data[1];

            result.previous.forEach(function(formation){
              formation.image = 'data:image/png;base64,' + formation.image.file;
            });

            result.next.forEach(function(formation){
              formation.image = 'data:image/png;base64,' + formation.image.file;
            });

            res.view('site/formation',{
              content: {
                title: result.name
              },
              formation: result
            })
          });
      })
  }
};

