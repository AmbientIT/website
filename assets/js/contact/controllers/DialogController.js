angular.module('contact')
  .controller('DialogController', ['$modalInstance','message','isError',function($modalInstance, message, isError){
    var dialog = this;
    dialog.isError = isError;
    dialog.close = function(){
      $modalInstance.close();
    };
    dialog.message = message;
  }]);
