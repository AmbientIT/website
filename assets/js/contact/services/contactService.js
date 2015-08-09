angular.module('contact')
  .factory('contactService', function($http){
    return {
      create: function(contact){
        return $http
          .post('/api/contact', contact)
          .then(function(data){
            return data;
          });
      }
    }
  });
