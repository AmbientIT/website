/**
 * SiteControllerController
 *
 * @description :: Server-side logic for managing Sitecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	homePage: function(req,res){
    return Promise.all([
      Formation
        .find({
          home: true
        })
        .populate('image'),
      User.find()
    ])
      .then(function(result){
        result[0].forEach(function(formation){
          formation.image = 'data:image/png;base64,'+formation.image.file;
        });
        res.locals.layout = 'layouts/default';
        return res.view('site/home',{
          content: {
            title: 'Centre de formation, Délégation de formateurs, conseil'
          },
          formations : result[0],
          users : result[1]
        })
      })
      .catch(res.serverError);
  },
  formationsPage: function(req,res) {
    return Formation
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
          formation.image ? formation.image = 'data:image/png;base64,'+formation.image.file : formation.image = 'images/formation/logo.jpg';
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
    return Formation
      .findOne({slug : req.params.slug})
      .populate('category')
      .populate('image')
      .populate('next')
      .populate('previous')
      .then(function(result){
        result.image ? result.image = 'data:image/png;base64,' + result.image.file : result.image = 'images/formation/logo.jpg';
        var nextPromises = [];
        var previousPromise = [];
        result.previous.forEach(function(formation){
          previousPromise.push(Formation.findOne({id:formation.id}).populate('image'))
        });
        result.next.forEach(function(formation){
          nextPromises.push(Formation.findOne({id:formation.id}).populate('image'))
        });
        return Promise
          .all([Promise.all(previousPromise),Promise.all(nextPromises)])
          .then(function(data){
            result.previous = data[0];
            result.next = data[1];

            result.previous.forEach(function(formation){
              formation.image ? formation.image = 'data:image/png;base64,' + formation.image.file :  formation.image = '/images/formation/logo.jpg';
            });

            result.next.forEach(function(formation){
              formation.image ? formation.image = 'data:image/png;base64,' + formation.image.file : formation.image = '/images/formation/logo.jpg';
            });

            return res.view('site/formation',{
              content: {
                title: result.name
              },
              formation: result
            })
          });
      })
      .catch(res.serverError)
  }
};

