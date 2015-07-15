/**
 * googleAuthService
 *
 * @description :: Server-side logic for authentication with google services
 * @help        :: https://github.com/sahat/satellizer/blob/master/examples/server/node/server.js
 */
var request = require('request-promise');
var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

module.exports = {
  getProfileInfo: function(code, clientId, redirectUri){
    console.log('serviccccuh')
    var params = {
      code: code,
      client_id: clientId,
      client_secret: sails.config.GOOGLE_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    };
    return request.post(accessTokenUrl, { json: true, form: params })
      .then(function(token) {
        var accessToken = token.access_token;
        var headers = {Authorization: 'Bearer ' + accessToken};
        return request.get({url: peopleApiUrl, headers: headers, json: true})
      })
      .then(function(profile){
        if(profile.hd !== 'ambient-it.net'){
          throw new Error('bad mail sorry bro ;)')
        }else{
          return profile;
        }
      })
  }
};
