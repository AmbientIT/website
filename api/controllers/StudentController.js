/**
 * StudentsController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var studentPromise;

    if(!req.query._page && !req.query._sortDir){
      studentPromise = Student.find()
    }

    if(req.query._page && !req.query._sortDir){
      studentPromise = Student.find()
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      studentPromise = Student.find()
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      studentPromise,
      Student.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Student.findOne({ slug: req.params.id })
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Student.update({slug: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Student.destroy({slug:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};
