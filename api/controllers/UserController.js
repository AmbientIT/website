/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jwt-simple');

module.exports = {
  find: function(req, res){
    if(req.query._page){
      return Promise.all([
        User.find()
          .sort(req.query._sortField + ' '+req.query._sortDir)
          .paginate({page: req.query._page , limit: req.query._perPage }),
        User.count()
      ])
      .then(function(results) {
        res.set('X-Total-Count',results[1])
        return res.json(results[0]);
      })
      .catch(res.serverError)
    }

    return User.find(req.query)
      .then(function(result){
        return res.json(result)
      })
      .catch(res.serverError)
  },
  me: function(req, res){
    res.json(req.user);
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

              return User.findOne({id:payload.sub})
            })
            .then(function(user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              return User.update({id:user.id},{
                google : profile.sub,
                picture: user.picture || profile.picture.replace('sz=50', 'sz=200'),
                displayName : user.displayName || profile.name,
                email: profile.email
              })
            })
            .then(function(updatedUser){
              res.json({ token:updatedUser.tokenify() })
            });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ google: profile.sub })
            .then(function(existingUser) {
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

