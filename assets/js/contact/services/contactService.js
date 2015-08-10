angular.module('contact')
  .factory('contactService', ['$http',function($http){
    return {
      create: function(contact){
        return $http
          .post('/api/contact', contact)
          .then(function(data){
            return data;
          });
      }
    }
  }]);
