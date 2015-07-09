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
  if (!req.headers.authorization) {
    return res.forbidden('Please make sure your request has an Authorization header');
  }
  var token = req.headers.authorization.split(' ')[1];

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
  req.user = payload.sub;
  next();
};
