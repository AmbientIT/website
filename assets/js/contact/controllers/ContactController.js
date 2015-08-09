angular.module('contact')
  .controller('ContactController', ['$http','$modal','$window','formationService','contactService','$location', function ($http, $modal,$window, formationService, contactService,$location) {
    var ctrl = this;
    ctrl.formations = formationService.get();
    if($window.location.search){
      ctrl.contact = {
        formations: []
      };
      angular.forEach(formations,function(formation){
        if($window.location.search.substr(11) === formation.slug){
          console.log(formation);
          ctrl.contact.formations.push(formation);
        }
      })
    }

    ctrl.afterCreationDialog = function(message,isError){
      return  $modal.open({
        animation: true,
        templateUrl: '../templates/contact/dialog/after-contact.tpl.html',
        resolve: {
          message: function(){
            return message;
          },
          isError: function(){
            return isError;
          }
        },
        controller: 'DialogController',
        controllerAs: 'dialog',
        size: 'sm',
        keyboard: false,
        backdrop: 'static'
      }).result;
    };

    ctrl.submit = function (contact) {
      var data;
      if(contact){
        if(contact.formations){
          data = angular.copy(contact);
          data.formations = contact.formations.map(function(formation){
            return formation.slug;
          });
        }else{
          data = contact;
        }
        if(ctrl.contactForm.$valid){
          ctrl.isPending = true;

          data.type = $location.path().replace('/','');

          contactService
            .create(data)
            .then(function(){
              ctrl.isPending = false;
              return ctrl.afterCreationDialog('Nous avons bien reçus votre demande, nous vous recontacterons dans les plus bref delais.', false);
            })
            .then(function(){
              window.location.href = 'http://ambientpreprod.cloudapp.net/';
            })
            .catch(function(err){
              return ctrl.afterCreationDialog('Nous sommes désolé une erreur est survenue', true);
            })
            .then(function(){
              window.location.href = 'http://ambientpreprod.cloudapp.net/';
            })
        }
      }
    };
  }]);
