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
  if(req.user.role !== '1'){
    return res.forbidden('admin only');
  }
  next();
};
