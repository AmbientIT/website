/**
 * SiteControllerController
 *
 * @description :: Server-side logic for managing Sitecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCalEvents: function(req, res){
    googleAPI.getCalendarInfo()
      .then(function(data){
        console.log(data);
      })
      .catch(res.serverError);
  }
};

