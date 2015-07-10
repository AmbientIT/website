angular.module('contact', ['ngMessages','ui.select'])
  .controller('ContactFormController', function ($http) {
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
            alert('success');
            console.log(data);
          })
          .catch(function(err){
            alert('ERROR !!!!');
            console.log(err);
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
