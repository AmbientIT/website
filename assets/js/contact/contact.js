angular.module('contact', ['ngMessages'])

  .controller('ContactFormController', function ($http) {
    var ctrl = this;

    ctrl.formData = {};

    ctrl.submit = function () {
      $http
        .post('/api/contact',ctrl.formData)
        .success(function(data){
          alert('success');
          console.log(data);
        })
        .catch(function(err){
          alert('ERROR !!!!');
          console.log(err);
        })
    };

  });
