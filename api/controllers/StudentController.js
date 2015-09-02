/**
 * StudentsController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var studentPromise;
    var search = {};
    if(req.query._filters){
      search = JSON.parse(req.query._filters);
    }

    if(!req.query._page && !req.query._sortDir){
      studentPromise = Student.find(search)
    }

    if(req.query._page && !req.query._sortDir){
      studentPromise = Student.find(search)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      studentPromise = Student.find(search)
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
    return Student.findOne({ id: req.params.id })
      .populate('sessions')
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Student.update({id: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Student.destroy({id:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};

