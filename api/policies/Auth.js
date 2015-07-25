/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

var jwt = require('jwt-simple');
var moment =require('moment');
module.exports =  function (req, res, next) {
  var token;
  if (req.headers && req.headers.authorization) {

    var parts = req.headers.authorization.split(' ');

    if (parts.length == 2) {

      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }

    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }

  } else if (req.param('token')) {

    token = req.param('token');
    delete req.query.token;

  }

// If connection from socket
  else if (req.socket && req.socket.handshake && req.socket.handshake.query && req.socket.handshake.query.token) {

    token = req.socket.handshake.query.token;

  } else {
    sails.log(req.socket.handshake);
    return res.json(401, {err: 'No Authorization header was found'});
  }

  var payload = null;
  try {
    payload = jwt.decode(token, sails.config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.forbidden('Token has expired');
  }
  User.findOne()
    .where({slug : payload.sub})
    .then(function(result){
      if(result){
        req.user = result;
        return next();
      }else{
        res.forbidden('unknown user');
      }
    })
    .catch(res.serverError);
};
