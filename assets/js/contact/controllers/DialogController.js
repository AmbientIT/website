angular.module('contact')
  .controller('DialogController', ['$modalInstance','message',function($modalInstance, message){
    var dialog = this;
    dialog.close = function(){
      $modalInstance.close();
    };
    dialog.message = message;
  }]);
