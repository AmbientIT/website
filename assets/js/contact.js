angular.module('contact', ['ngMessages','ngAnimate','ui.select','ui.bootstrap'])
  .config(function($sceProvider){
    $sceProvider.enabled(false);
  })
  .controller('ContactFormController', function ($http, $modal) {
    var ctrl = this;
    ctrl.formations = [];

    $http
      .get('/api/formation')
      .success(function(formations){
        ctrl.formations = formations;
      });

    ctrl.formData = {};

    ctrl.submit = function (form) {
      var formationsId = ctrl.formData.formations.map(function(formation){
        return formation.id
      });
      var data = angular.copy(ctrl.formData);
      data.formations = formationsId;
      if(form.$valid){
        $http
          .post('/api/contact',data)
          .success(function(data){
            $modal.open({
              animation: true,
              templateUrl: 'templates/after-contact-dialog.tpl.html',
              controller: function($modalInstance){
                this.close = function(){
                  $modalInstance.close();
                };
                this.message = 'Nous avons bien reçus votre demande, nous vous recontacterons dans les plus bref delais.'
              },
              controllerAs: 'dialog',
              size: 'sm'
            })
              .result.then(function(){
                window.location.href = 'http://localhost:1337/'
              })
          })
          .catch(function(err){
            $modal.open({
              animation: true,
              templateUrl: 'after-contact-dialog.tpl.html',
              controller: function($modalInstance){
                this.close = function(){
                  $modalInstance.close();
                };
                this.isError = true;
                this.message = 'Notre serveur rencontre des difficultés, merci de recommencer plus tard.'
              },
              controllerAs: 'dialog',
              size: 'sm'
            })
          })
      }
    };

  })
  .filter('propsFilter', function() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  });
