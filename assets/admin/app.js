(function () {
  'use strict';

  angular.module('myApp', [
    'ng-admin',
    'satellizer',
    'ui.select'
  ])

    .controller('main', function ($scope, $rootScope, $location) {
      $rootScope.$on('$stateChangeSuccess', function () {
        $scope.displayBanner = $location.$$path === '/dashboard';
      });
    })

    .controller('LoginController', function($auth,$location){
      if($auth.isAuthenticated()){
        $location.path('/dashboard')
      }
      this.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(){
            $location.path('/dashboard')
          })
          .catch(function(err){
            alert('you\'re not welcome here stranger');
          })
      };
      this.login = function(){

      };
    })
    .directive('adminMailto', function(){
      return {
        scope:{
          email: '@'
        },
        template:'<a href="mailto:{{email}}">{{email}}</a>'
      }
    })
    .directive('adminPicture', function(){
      return {
        scope:{
          base64: '@',
          height: '@'
        },
        template:'<img src="data:image/png;base64,{{base64}}" height="{{height}}"/>'
      }
    })
    .directive('adminRelationRepeter', function(){
      return {
        scope: {
          data: '=',
          entityName: '@'
        },
        template: '<ul style="list-style: none"><li><a ng-href="http://localhost:1337/admin#/{{ entityName }}/show/{{item.id}}" class="btn btn-primary btn-xs item" ng-repeat="item in data">{{item.name || item.displayName}}<a/></li></ul>',
        link: function(scope){
          console.log(scope.entityName)
        }
      }
    })
    .directive('adminRelationSelect', function($http){
      return {
        //replace:true,
        scope: {
          relationName: '@',
          data: '='
        },
        templateUrl: '/admin/views/select.tpl.html',
        link: function(scope){
          if(!scope.data){
            scope.data[scope.relationName] = [];
          }
          $http.get('/api/'+scope.relationName)
            .success(function(data){
              scope.entities = data;
            })
            .error(function(err){
              console.log(err);
            })
        }
      }
    })
    .run(function($auth,$location){
      if($auth.isAuthenticated()){
        $location.path('/dashboard')
      }else{
        $location.path('/login')
      }
    })
    .config(function (NgAdminConfigurationProvider, RestangularProvider, $stateProvider, $authProvider) {
      $authProvider.google({
        clientId: '599047877515-mqahp4fo89j1lt9mlnsg884sht1ijslk.apps.googleusercontent.com'
      });

      $stateProvider
        .state('login', {
          url: '/login',
          controller: 'LoginController as ctrl',
          templateUrl: 'templates/login.tpl.html'
        });

      var nga = NgAdminConfigurationProvider;

      function truncate(value) {
        if (!value) {
          return '';
        }

        return value.length > 50 ? value.substr(0, 50) + '...' : value;
      }

      // use the custom query parameters function to format the API request correctly
      //RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
      //  if (operation == "getList") {
      //
      //  }
      //  return {params: params};
      //});

      var admin = nga.application('AmbientIT Back-Office')
        .baseApiUrl('http://localhost:1337/api/');

      var contact = nga.entity('contact')
        .identifier(nga.field('id'));

      var formation = nga.entity('formation')
        .identifier(nga.field('id'));

      var category = nga.entity('category')
        .identifier(nga.field('id'));

      var user = nga.entity('user')
        .identifier(nga.field('id'));

      var media = nga.entity('media')
        .identifier(nga.field('id'));

      var trainer = nga.entity('trainer')
        .identifier(nga.field('id'));

      // set the application entities
      admin
        .addEntity(contact)
        .addEntity(user)
        .addEntity(category)
        .addEntity(formation)
        .addEntity(trainer)
        .addEntity(media);

      //// customize entities and views
      //

      trainer.dashboardView()
        .title('formateurs')
        .perPage(5)
        .fields([
          nga.field('displayName'),
          nga.field('email'),
          nga.field('formations','template')
            .template('<admin-relation-repeter data="entry.values.formations" entity-name="formation"></admin-relation-repeter>'),
          nga.field('price', 'template')
            .label('tarif journalier')
            .template('<span>{{ entry.values.price | currency:"€":2:true }}</span>')
        ]);

      trainer.listView()
        .title('Formateurs')
        .fields([
          trainer.dashboardView().fields()
        ])
        .listActions(['show', 'edit', 'delete']);

      trainer.creationView()
        .title('Ajout d\'un nouveau formateur')
        .fields([
          nga.field('user', 'reference')
            .label('associé à un compte ambient-it ?')
            .map(truncate)
            .targetEntity(user)
            .targetField(nga.field('displayName')),
          nga.field('firstName')
            .label('Prénom')
            .attributes({placeholder: 'le prénom du formateur'})
            .validation({ minlength: 2, maxlength:30}),
          nga.field('lastName')
            .label('Prénom')
            .attributes({placeholder: 'le prénom du formateur'})
            .validation({ minlength: 2, maxlength:30}),
          nga.field('email')
            .label('email')
            .attributes({placeholder: 'l\'email du formateur'})
            .validation({ email: true}),
          nga.field('formations','template')
            .label('formations')
            .template('<div admin-relation-select data="entry.values" relation-name="formation"></div>'),
          nga.field('price', 'number')
            .label('prix')
            .attributes({placeholder: 'le tarif journalier du formateur'})
            .validation({number: true}),
          nga.field('extrenal', 'boolean')
            .label('est une resource externe ?'),
          nga.field('home', 'boolean')
            .label('affiché en home ? (4 max)')
        ]);

      trainer.editionView()
        .title('Edition du formateur "{{ entry.values.displayName }}"')
        .actions(['list', 'delete'])
        .fields([
          trainer.creationView().fields()
        ]);

      trainer.deletionView()
        .title('Confirmez vous la suppression du formateur {{ entry.values.displayName }} ?')
        .description('Attention Toute suppression est definitive');


      media.dashboardView()
        .title('derniers uploads')
        .fields([
          nga.field('file','template')
            .template('<admin-picture base64="{{ entry.values.file }}" height="50px"></admin-picture>'),
          nga.field('name'),
          nga.field('size','template')
            .label('taille')
            .template('<span>{{ entry.values.size | size }}</span>')

        ]);

      media.listView()
        .title('Bibliothèque de multimédia')
        .description('List of media')
        .infinitePagination(true)
        .fields([
          nga.field('file','template')
            .template('<admin-picture base64="{{ entry.values.file }}" height="50px"></admin-picture>'),
          nga.field('name')
            .label('nom du média'),
          nga.field('size','template')
            .label('taille')
            .template('<span>{{ entry.values.size | size }}</span>')
      ])
        .listActions(['show', 'edit', 'delete']);

      media.creationView()
        .title('upload un nouveau fichier')
        .description('Pour pouvoir utiliser le fichiers il faudra ensuite le modifier et lui ajouter un nom')
        .fields([
          nga.field('file','file')
            .label('Le fichier à uploader')
            .uploadInformation({ 'url': 'http://localhost:1337/api/upload/media?avatar=true', 'fileFormDataName': 'file', 'accept': '.png' })
        ]);

      media.editionView()
        .title('Modifier les informations de votre média "{{ entry.values.name }}"')
        .actions(['list', 'delete'])
        .fields([
          nga.field('name')
            .label('Nom')
            .attributes({placeholder: 'le nom du média'})
            .validation({ required: true, maxlength:30}),
          nga.field('description')
            .label('Descriion')
            .attributes({placeholder: 'la description du média'})
            .validation({ maxlength:200})
        ]);

      media.showView()
        .title('"{{ entry.values.name }}"')
        .actions(['list', 'delete', 'create'])
        .fields([
          media.editionView().fields(),
          nga.field('originalName')
            .label('nom original'),
          nga.field('size','template')
            .label('taille')
            .template('<span>{{ entry.values.size | size }}</span>'),
          nga.field('file','template')
            .label('rendu')
            .template('<admin-picture base64="{{ entry.values.file }}" ></admin-picture>')
        ]);

      media.deletionView()
        .title('Confirmez vous la suppression du média {{ entry.values.name }} ?')
        .description('Attention Toute suppression est definitive');




      user.dashboardView()
        .title('La team')
        .perPage(5)
        .fields([
          nga.field('displayName')
            .label('Nom'),
          nga.field('email','template')
            .label('Email')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>')
        ]);

      user.listView()
        .title('La team ')
        .description('Tous les utilisateurs enregistrés via google avec leur compte ambient-it.net')
        .fields([
          user.dashboardView().fields()
        ])
        .listActions(['show', 'edit', 'delete']);


      user.editionView()
        .title('Edit user "{{ entry.values.name }}"')
        .actions(['list', 'delete'])
        .fields([
          user.listView().fields(),
          nga.field('description', 'text')
        ]);

      user.deletionView()
        .title('Confirmez vous la suppression de l\' utilisateur {{ entry.values.displayName }} ?')
        .description('Attention Toute suppression est definitive');




      category.dashboardView()
        .title('Catégories de formations')
        .perPage(5)
        .fields([
          nga.field('name')
            .label('Nom')
            .attributes({placeholder: 'Le nom de la catégorie'})
            .validation({required: true, minlength: 3, maxlength: 50}),
          nga.field('description', 'text')
            .label('Description')
            .attributes({placeholder: 'Une description de la catégorie'})
            .validation({required: true, minlength: 10, maxlength: 300})
        ]);

      category.listView()
        .title('Catégories de formations')
        .description('Chaque catégorie regroupe plusieurs formations')
        .fields([
          category.dashboardView().fields()
        ])
        .listActions(['show', 'edit', 'delete']);

      category.creationView()
        .title('Création d\'une nouvelle catégorie de formations')
        .fields([
          category.dashboardView().fields(),
          nga.field('formations','template')
            .label('formations')
            .template('<div admin-relation-select data="entry.values" relation-name="formation"></div>')
        ]);

      category.editionView()
        .title('Modifier la categorie de formation "{{ entry.values.name }}"')
        .actions(['list', 'show', 'delete'])
        .fields([
          category.creationView().fields()
        ]);


      category.showView()
        .title('Categorie de formation : {{ entry.values.name }}')
        .actions(['list', 'show', 'delete'])
        .fields([
          category.dashboardView().fields(),
          nga.field('formations', 'template')
            .template('<admin-relation-repeter entity-name="formation" data="entry.values.formations"></admin-relation-repeter>')
        ]);


      category.deletionView()
        .title('Confirmez vous la suppression de la category {{ entry.values.name }} ?')
        .description('Attention Toute suppression est definitive');




      formation.dashboardView()
        .title('formations')
        .perPage(5)
        .fields([
          nga.field('name')
            .label('Nom')
            .attributes({placeholder: 'Le nom de la formation'})
            .validation({required: true, minlength: 2, maxlength: 40}),
          nga.field('category','reference')
            .label('Categorie')
            .validation({required: true})
            .map(truncate)
            .targetEntity(category)
            .targetField(nga.field('name').map(truncate)),
          nga.field('price', 'template')
            .label('Le prix de la formation')
            .template('<span>{{ entry.values.price | currency:"€":0:true }}</span>'),
          nga.field('previous', 'template')
            .label('Prérequis')
            .template('<admin-relation-repeter entity-name="formation" data="entry.values.previous"></admin-relation-repeter>')
        ]);


      formation.listView()
        .title('Formations')
        .perPage(10)
        .fields([
          formation.dashboardView().fields(),
          nga.field('description', 'text')
            .label('Description')
            .attributes({placeholder: 'La description de la formation'})
            .validation({required: true, minlength: 50, maxlength: 500}),
          nga.field('duration', 'number')
            .label('Durée')
            .attributes({placeholder: 'La durée en jour de la formation'})
            .validation({required: true, min: 1, max: 30}),
          nga.field('home', 'boolean')
            .label('homePage')

        ])
        .listActions(['show', 'edit', 'delete']);

      formation.showView()
        .title('Formation {{ entry.values.name }}')
        .fields([
          nga.field('image', 'template')
            .template('<admin-picture base64="{{ entry.values.image.file }}" height="100px"></admin-picture>'),
          nga.field('trainer', 'template')
            .label('Les formateurs')
            .template('<admin-relation-repeter entity-name="trainer" data="entry.values.trainer"></admin-relation-repeter>'),
          formation.listView().fields(),
          nga.field('next', 'template')
            .label('Les formations suivantes')
            .template('<admin-relation-repeter entity-name="formation" data="entry.values.next"></admin-relation-repeter>'),
          nga.field('slides')
            .label('support de cours')
            .validation({url: true, minlength: 15, maxlength: 100})
        ]);

      formation.creationView()
        .fields([
         formation.listView().fields(),
          nga.field('image', 'reference')
            .label('image')
            .map(truncate)
            .targetEntity(media)
            .targetField(nga.field('name').map(truncate)),
          nga.field('slides')
            .label('support de cours')
            .validation({url: true, minlength: 15, maxlength: 100}),
          nga.field('previous','template')
            .label('Prérequis')
            .template('<div admin-relation-select data="entry.values" relation-name="formation"></div>'),
          nga.field('program', 'wysiwyg')
            .label('Programme de cours')
            .attributes({placeholder: 'Programme détaillé de la formation'})
            .validation({required: true, min: 200, max: 10000})
        ]);

      formation.editionView()
        .title('Edition de la formation {{ entry.values.name }}')
        .fields([
          formation.creationView().fields()
        ]);

      formation.deletionView()
        .title('Confirmez vous la suppression de la formation {{ entry.values.name }} ?')
        .description('Attention Toute suppression est definitive');




      contact.dashboardView()
        .title('Derniers contacts')
        .perPage(5)
        .fields([
          nga.field('displayName')
            .label('Nom'),
          nga.field('company')
            .label('Société'),
          nga.field('email','template')
            .label('Email')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>'),
          nga.field('formations', 'template')
            .label('est intéréssé par')
            .template('<admin-relation-repeter data="entry.values.formations" entity-name="formation"></admin-relation-repeter>'),
          nga.field('createdAt', 'template')
            .template('<span>{{ entry.values.createdAt | date : "dd/mm/yyyy" }}</span>')

        ]);

      contact.listView()
        .title('Tous les  Contacts')
        .description('La liste de toutes les personnes nous ayant contacter via le site')
        .infinitePagination(true)
        .fields([
          contact.dashboardView().fields()
        ])
        .listActions(['show', 'delete']);

      contact.showView()
        .fields([
          contact.listView().fields(),
          nga.field('message')
            .label('message')
        ]);


      contact.deletionView()
        .title('Confirmez vous la suppression du contact {{ entry.values.displayName }} de la société {{ entry.values.displayName }} ?')
        .description('Attention Toute suppression est definitive');

      admin.menu(nga.menu()
          .addChild(nga.menu(contact).icon('<i class="ion-person-stalker"></i>'))
          .addChild(nga.menu(trainer).icon('<i class="ion-person-add"></i>'))
          .addChild(nga.menu(user).icon('<i class="ion-person"></i>'))
          .addChild(nga.menu(category).icon('<i class="ion-pricetag"></i>'))
          .addChild(nga.menu(formation).icon('<i class="ion-university"></i>'))
          .addChild(nga.menu(media).icon('<i class="ion-images"></i>'))


      );

      nga.configure(admin);
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
    })
    .filter('size', function() {
      return function(input) {
        var out = "";
        var size = parseInt(input);
        if (isNaN(size)) return "0";
        var unit = ["o","Ko","Mo","Go","To"];
        var i = 0;
        while (size >= 1024) {
          i++;
          size = size/1024;
        }
        out = size.toFixed(2) + ' ' + unit[i];
        return out;
      }
    });
})();
