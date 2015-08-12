/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jwt-simple');

module.exports = {
  find: function(req, res){
    var UserPromise;

    if(!req.query._page && !req.query._sortDir){
      UserPromise = User.find(req.query)
    }

    if(req.query._page && !req.query._sortDir){
      UserPromise = User.find()
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    if(req.query._sortDir){
      UserPromise = User.find()
        .sort(req.query._sortField + ' '+req.query._sortDir)
        .paginate({page: req.query._page , limit: req.query._perPage })
    }

    return Promise.all([
      UserPromise,
      User.count()
    ])
      .then(function(results) {
        res.set('X-Total-Count',results[1]);
        return res.json(results[0]);
      })
      .catch(res.serverError)
  },
  findOne: function(req, res){
    return User.findOne({ slug: req.params.id })
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  update: function(req, res){
    return User.update({slug: req.params.id},req.body)
      .then(function(result){
        return res.json(result);
      })
      .catch(res.serverError);
  },
  destroy: function(req,res){
    return User.destroy({slug:req.params.id})
      .then(function(){
        return res.send();
      })
      .catch(res.serverError);
  },
  me: function(req, res){
    req.user ? res.json(req.user) : res.forbidden();
  },
  googleAuth: function(req,res){
    googleAuth.getProfileInfo(req.body.code,req.body.clientId,req.body.redirectUri)
      .then(function(profile) {
        if (req.headers.authorization) {
          User.findOne({ google: profile.sub })
            .then(function(existingUser) {
              if (existingUser) {
                return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
              }
              var token = req.headers.authorization.split(' ')[1];
              try{
                var payload = jwt.decode(token, sails.config.TOKEN_SECRET);
              }catch(e){
                return res.serverError(e);
              }

              return User.findOne({slug:payload.sub})
            })
            .then(function(user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              return User.update({slug:user.slug},{
                google : profile.sub,
                picture: user.picture || profile.picture.replace('sz=50', 'sz=200'),
                displayName : user.displayName || profile.name,
                email: profile.email
              })
            })
            .then(function(updatedUser){
              console.log(updatedUser);
              res.json({ token:updatedUser.tokenify() })
            });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          console.log('ouiouioui')
          User.findOne({ google: profile.sub })
            .then(function(existingUser) {
              console.log(existingUser);
              if (existingUser) {
                return res.send({ token: existingUser.tokenify() });
              }else{
                var user = {
                  google : profile.sub,
                  picture : profile.picture.replace('sz=50', 'sz=200'),
                  displayName : profile.name,
                  email: profile.email
                };
                User.create(user)
                  .then(function(createdUser){
                    res.json({token: createdUser.tokenify()})
                  });
              }
            })
        }
      })
      .catch(res.forbidden)
  }
};

