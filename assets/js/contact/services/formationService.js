angular.module('contact')
.factory('formationService', function($http){
    var cache = [];
    return {
      findAll: function(){
        return $http
          .get('/api/formation')
          .then(function(httpData){
            cache = httpData.data;
            return cache;
          });
      },
      get: function(){
        return cache;
      }
    }
  });
