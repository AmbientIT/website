/**
 * FormationController
 *
 * @description :: Server-side logic for managing Formations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise
        .all([
          Formation
            .find()
            .sort(req.query._sortField + ' '+req.query._sortDir)
            .paginate({page: req.query._page , limit: req.query._perPage })
            .populate('image')
            .populate('category')
            .populate('next')
            .populate('previous')
            .populate('trainers'),
          Formation.count()
        ])
          .then(function(results) {
            res.set('X-Total-Count',results[1]);
            return res.json(results[0]);
          })
        .catch(res.serverError);
    }

    return Formation
      .find(req.query)
      .populate('category')
      .populate('next')
      .populate('previous')
      .populate('image')
      .populate('trainers')
      .then(function(result){
        result.forEach(function(formation){
          if(formation.image.file){
            formation.image = 'data:image/png;base64,'+formation.image.file;
          }else{
            formation.image = '/images/formation.logo.jpg'
          }
        });
        return res.json(result);
      })
      .catch(res.serverError);
  },
  findOne: function(req, res){
    return Formation
      .findOne({ id : req.params.id })
      .populate('next')
      .populate('previous')
      .populate('trainers')
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  toPdf: function(req,res){
    return Formation
      .findOne({slug: req.params.slug})
      .populate('next')
      .populate('image')
      .populate('previous')
      .populate('trainers')
      .then(function(formation){
        if(formation.image.file){
          formation.image = 'data:image/png;base64,'+formation.image.file;
        }else{
          formation.image = '/images/formation.logo.jpg'
        }
        return pdfGenerator
          .fromEjs('formation',formation)
          .pipe(res);
      }).catch(res.serverError)
  }
};

