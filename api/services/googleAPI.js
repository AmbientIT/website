/**
 * googleAuthService
 *
 * @description :: Server-side logic for authentication with google services
 * @help        :: https://github.com/sahat/satellizer/blob/master/examples/server/node/server.js
 */
var request = require('request-promise');
var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
var gcal = require('google-calendar');

var googleCal = {};

module.exports = {
  getProfileInfo: function(token){
    var accessToken = token.access_token;
    var headers = {Authorization: 'Bearer ' + accessToken};
    return request.get({url: peopleApiUrl, headers: headers, json: true})
    .then(function(profile){
      if(profile.hd !== 'ambient-it.net'){
        throw new Error('bad mail sorry bro ;)')
      }else{
        return profile;
      }
    })
    .catch(function(err){
      console.log(err)
    })
  },
  initCal: function(token){
    googleCal = new gcal.GoogleCalendar(token);
    console.log(token,googleCal)
  },
  getCalendarInfo: function(){
    return new Promise(function(resolve, reject){
      return googleCal.calendarList.list(function(err, calendarList) {
        if(err){
          return reject(err);
        }else{
          return resolve(calendarList);
        }
      });
    });
  },
  getAccessToken: function(code, clientId, redirectUri){
    var params = {
      code: code,
      client_id: clientId,
      client_secret: sails.config.GOOGLE_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      scope: ['https://www.googleapis.com/auth/calendar']
    };
    return request.post(accessTokenUrl, { json: true, form: params })
  }
};
