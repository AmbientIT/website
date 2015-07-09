angular.module('contact', ['ngMessages'])

  .controller('ContactFormController', function ($http) {
    var ctrl = this;

    ctrl.formData = {};

    ctrl.submit = function () {
      console.log(ctrl.formData);
    };

  });
