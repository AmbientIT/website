/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res){
    var sessionPromise;

    if(!req.query._page && !req.query._sortDir){
      sessionPromise = Session.find(req.query)
    }

    if(req.query._page && !req.query._sortDir){
      sessionPromise = Session.find()
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      sessionPromise = Session.find()
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      sessionPromise,
      Session.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req,res){
    return Session.findOne({ id: req.params.id })
      .populate('students')
      .then(function(trainer){
        return res.json(trainer);
      })
      .catch(res.serverError);
  },
  create: function(req, res){
    function transformDate(string){
      var array = string.split('-');
      console.log(array)
      return new Date(array[2],array[1],array[0])
    }
    console.log(req.body);
    try{
      req.body.start = transformDate(req.body.start);
      req.body.end = transformDate(req.body.end);
    }catch(err){
      res.serverError(err);
    }

    return Session.create(req.body)
      .then(function(result){
          res.json(result);
        })
      .catch(res.serverError);
  },
  update: function(req, res){
    return Session.update({id: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return Session.destroy({id:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  }
};

