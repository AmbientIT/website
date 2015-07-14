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
        template: '<ul style="list-style: none"><li><a href="http://localhost:1337/admin#/{{ entityName }}/show/{{item.id}}" ng-repeat="item in data">{{item.name}}<a/></li></ul>'
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
        link: function(scope,element,attrs,ngModel){
          $http.get('/api/'+scope.relationName)

            .success(function(data){
              scope.formations = data;
              scope.data.push({})
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
          nga.field('price', 'number').format('€0,0.00')
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

          nga.field('price', 'number')
            .label('prix')
            .attributes({placeholder: 'le tarif journalier du formateur'})
            .validation({number: true})
            .format('€0,0.00'),
          nga.field('extrenal', 'boolean')
            .label('est une resource externe ?'),
          nga.field('home', 'boolean')
            .label('affiché en home ? (4 max)')
        ]);

      trainer.editionView()
        .title('Edition du formateur "{{ entry.values.displayName }}"')
        .actions(['list', 'delete'])
        .fields([
          trainer.creationView().fields(),
          nga.field('formations','template')
            .label('formations')
            .template('<div admin-relation-select data="entry.values" relation-name="formation"></div>')
        ]);



      contact.dashboardView()
        .title('Derniers contacts')
        .perPage(5)
        .fields([
          nga.field('formations', 'template')
            .template('<admin-relation-repeter data="entry.values.formations" entity-name="formation"></admin-relation-repeter>'),
          nga.field('displayName'),
          nga.field('email','template')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>'),
          nga.field('createdAt', 'template')
            .template('<span>{{ entry.values.createdAt | date }}</span>')

        ]);


      formation.dashboardView()
        .title('formations')
        .perPage(5)
        .fields([
          nga.field('name'),
          nga.field('category','reference')
            .label('Category')
            .map(truncate)
            .targetEntity(category)
            .targetField(nga.field('name').map(truncate)),
          nga.field('previous', 'template')
            .label('Prérequis')
            .template('<admin-relation-repeter entityName="formation" data="entry.values.previous"></admin-relation-repeter>')
        ]); // fields() called with arguments add fields to the view


      media.dashboardView()
        .title('derniers uploads')
        .fields([
          nga.field('name'),
          nga.field('size')
        ]);

      media.listView()
        .title('Bibliothèque de multimédia')
        .description('List of media')
        .infinitePagination(true)
        .fields([
          nga.field('name')
            .label('nom du média'),
          nga.field('size','number')
            .label('taille du média'),
          nga.field('file','template')
            .template('<admin-picture base64="{{ entry.values.file }}" height="50px"></admin-picture>')

      ])
        .listActions(['show', 'edit', 'delete']);

      media.creationView()
        .title('upload un nouveau fichier')
        .description('Pour pouvoir utiliser le fichiers il faudra ensuite le modifier et lui ajouter un nom')
        .fields([
          nga.field('file','file')
            .uploadInformation({ 'url': 'http://localhost:1337/api/upload/media?avatar=true', 'fileFormDataName': 'file', 'accept': '.png' })
        ]);

      media.editionView()
        .title('Modifier les informations de votre média "{{ entry.values.name }}"')
        .actions(['list', 'delete'])
        .fields([
          nga.field('name'),
          nga.field('description')

        ]);

      media.showView()
        .title('Edit media "{{ entry.values.name }}"')
        .actions(['list', 'delete', 'create'])
        .fields([
          media.editionView().fields(),
          nga.field('originalName'),
          nga.field('size'),
          nga.field('file','template')
            .template('<admin-picture base64="{{ entry.values.file }}" height="400px"></admin-picture>')
        ]);






      user.dashboardView()
        .title('Nous !!!')
        .perPage(5)
        .fields([
          nga.field('displayName'),
          nga.field('email','template')
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



      category.listView()
        .title('Catégories de formations')
        .description('Chaque catégorie regroupe plusieurs formations')
        .fields([
          nga.field('name')
            .label('Nom')
            .attributes({placeholder: 'Le nom de la catégorie'})
            .validation({required: true, minlength: 3, maxlength: 50}),
          nga.field('description', 'text')
            .label('Description')
            .attributes({placeholder: 'Une description de la catégorie'})
            .validation({required: true, minlength: 10, maxlength: 300})
        ])
        .listActions(['show', 'edit', 'delete']);

      category.creationView()
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

      category.editionView()
        .title('Edit category "{{ entry.values.name }}"')
        .actions(['list', 'show', 'delete'])
        .fields([
          category.creationView().fields(),
          nga.field('formations', 'reference_many')
            .targetEntity(formation)
            .targetField(nga.field('name'))
            .cssClasses('col-sm-4')
        ]);


      category.showView()
        .fields([
          category.editionView().fields(),
        ]);


      formation.listView()
        .title('Formations')
        .perPage(10)
        .fields([
          nga.field('name')
            .label('Name'),
          nga.field('description', 'text')
            .label('Description'),
          nga.field('duration', 'number')
            .label('duration'),
          nga.field('price', 'template')
            .template('<span>{{ entry.values.price | currency:"€" }}</span>')
            .label('price'),
          nga.field('category', 'reference')
            .label('Category')
            .map(truncate)
            .targetEntity(category)
            .targetField(nga.field('name').map(truncate)),
          nga.field('home', 'boolean')
            .label('homePage')
        ])
        .filters([
          nga.field('name')
            .label('Name')
            .attributes({'placeholder': 'Filter by name'})
        ])
        .listActions(['show', 'edit', 'delete']);

      formation.creationView()
        .fields([
          nga.field('name')
            .label('Name'),
          nga.field('description', 'text')
            .label('Description'),
          nga.field('category', 'reference')
            .label('Category')
            .map(truncate)
            .targetEntity(category)
            .targetField(nga.field('name').map(truncate)),
          nga.field('image', 'reference')
            .label('image')
            .map(truncate)
            .targetEntity(media)
            .targetField(nga.field('name').map(truncate)),
          nga.field('duration', 'number')
            .label('duration'),
          nga.field('price', 'number')
            .label('Price'),
          nga.field('slides')
            .label('slides'),
          nga.field('home', 'boolean')
            .label('homePage'),
          nga.field('previous', 'reference_many')
            .targetEntity(formation)
            .targetField(nga.field('name')),
          nga.field('program', 'wysiwyg')
            .label('Program')
        ]);

      formation.editionView()
        .fields([
          formation.creationView().fields()
        ]);


      formation.showView()
        .fields([
          formation.editionView().fields(),
          nga.field('previous', 'reference_many')
            .targetEntity(formation)
            .targetField(nga.field('name'))
        ]);

      formation.deletionView()
        .title('Deletion confirmation');

      contact.listView()
        .title('All Contacts')
        .description('List of contacts')
        .infinitePagination(true)
        .fields([
          nga.field('formations', 'template')
            .template('<ul style="list-style: none"><li><a href="http://localhost:1337/admin#/formation/show/{{formation.id}}" ng-repeat="formation in entry.values.formations">{{formation.name}}<a/></li></ul>'),
          nga.field('displayName')
            .label('displayName'),
          nga.field('email', 'template')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>'),
          nga.field('createdAt')
            .label('date')
        ])
        .listActions(['show', 'delete']);

      contact.showView()
        .fields([
          contact.listView().fields(),
          nga.field('message')
            .label('message')
        ]);


      contact.deletionView()
        .title('Deletion confirmation');

      admin.menu(nga.menu()
          .addChild(nga.menu(contact).icon('<span class="glyphicon glyphicon-message-full"></span>'))
          .addChild(nga.menu(trainer).icon('<span class="glyphicon glyphicon-message-full"></span>'))
          .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
          .addChild(nga.menu(category).icon('<span class="glyphicon glyphicon-file"></span>'))
          .addChild(nga.menu(formation).icon('<strong style="font-size:1.3em;line-height:1em">✉</strong>'))
          .addChild(nga.menu(media).icon('<span class="glyphicon glyphicon-file"></span>'))


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
    });
})();
