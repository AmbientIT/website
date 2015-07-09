/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jwt-simple');

module.exports = {
  me: function(req, res){
    res.json(req.user);
  },
	google: function(req,res){

    googleAuth.getProfileInfo(req.body.code,req.body.clientId,req.body.redirectUri)
      .then(function(profile) {
          console.log(profile);
        if (req.headers.authorization) {
           User.findOne({ google: profile.sub })
            .then(function(existingUser) {
              if (existingUser) {
                return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
              }
              var token = req.headers.authorization.split(' ')[1];
              var payload = jwt.decode(token, sails.config.TOKEN_SECRET);
              return User.findOne({id:payload.sub})
            })
            .then(function(user) {
              if (!user) {
                return res.status(400).send({ message: 'User not found' });
              }
              return User
                .update({id:user.id},{
                  google : profile.sub,
                  picture: user.picture || profile.picture.replace('sz=50', 'sz=200'),
                  displayName : user.displayName || profile.name,
                  email: profile.email
                })
            })
             .then(function(updatedUser){
               //console.log(updatedUser)
               res.json({ token:updatedUser.tokenify() })
             });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({ google: profile.sub })
            .then(function(existingUser) {
              console.log(existingUser)
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
      .catch(function(err){
        res.forbidden(err.message);
      })
    }
};

