(function () {
  'use strict';

  angular.module('myApp', [
    'ng-admin',
    'satellizer'
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

      var admin = nga.application('AmbientIT Back-Office') // application main title
        .baseApiUrl('http://localhost:1337/api/'); // main API endpoint

      var contact = nga.entity('contact')
        .identifier(nga.field('id'));

      // define all entities at the top to allow references between them
      var formation = nga.entity('formation') // the API endpoint for posts will be http://localhost:3000/posts/:id
        .identifier(nga.field('id'));

      var category = nga.entity('category')
        .identifier(nga.field('id')); // you can optionally customize the identifier used in the api ('id' by default)

      var user = nga.entity('user')
        .identifier(nga.field('id'));

      var media = nga.entity('media')
        .identifier(nga.field('id'));

      // set the application entities
      admin
        .addEntity(contact)
        .addEntity(user)
        .addEntity(category)
        .addEntity(formation)
        .addEntity(media);

      //// customize entities and views
      //

      media.dashboardView()
        .title('derniers uploads')
        .fields([
          nga.field('name'),
          nga.field('size')
        ]);

      contact.dashboardView() // customize the dashboard panel for this entity
        .title('Derniers contacts')
        .order(1) // display the post panel first in the dashboard
        .perPage(10) // limit the panel to the 5 latest posts
        .fields([
          nga.field('formations', 'template')
            .template('<admin-relation-repeter data="entry.values.formations" entity-name="formation"></admin-relation-repeter>'),
          nga.field('displayName'),
          nga.field('email','template')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>'),
          nga.field('createdAt', 'template')
            .template('<span>{{ entry.values.createdAt | date }}</span>')

        ]); // fields() called with arguments add fields to the view


      user.dashboardView() // customize the dashboard panel for this entity
        .title('Us !!!')
        .order(2) // display the post panel first in the dashboard
        .perPage(10) // limit the panel to the 5 latest posts
        .fields([
          nga.field('displayName'),
          nga.field('email','template')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>')
        ]); // fields() called with arguments add fields to the view

      formation.dashboardView() // customize the dashboard panel for this entity
        .title('formations')
        .order(3) // display the post panel first in the dashboard
        .perPage(10) // limit the panel to the 5 latest posts
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

      media.listView()
        .title('All media') // default title is "[Entity_name] list"
        .description('List of media') // description appears under the title
        .infinitePagination(true) // load pages as the user scrolls
        .fields([
          nga.field('name'), // the default list field type is "string", and displays as a string
          nga.field('size'),
          nga.field('file','template')
            .template('<admin-picture base64="{{ entry.values.file }}" height="50px"></admin-picture>')

      ])
        .listActions(['show', 'edit', 'delete']);

      media.creationView()
        .title('upload a media "{{ entry.values.name }}"') // title() accepts a template string, which has access to the entry
        .actions(['list', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
        .fields([
          nga.field('file','file')
            .uploadInformation({ 'url': 'http://localhost:1337/api/upload/media?avatar=true', 'fileFormDataName': 'file' })
        ]);

      media.editionView()
        .title('Edit media "{{ entry.values.name }}"') // title() accepts a template string, which has access to the entry
        .actions(['list', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
        .fields([
          nga.field('name'), // the default list field type is "string", and displays as a string
          nga.field('description'), // Date field type allows date formatting

        ]);

      media.showView() // a showView displays one entry in full page - allows to display more data than in a a list
        .fields([
          nga.field('name'), // the default list field type is "string", and displays as a string
          nga.field('description'), // Date field type allows date formatting
          nga.field('originalName'),
          nga.field('size'),
          nga.field('file','template')
            .template('<admin-picture base64="{{ entry.values.file }}" height="400px"></admin-picture>')
        ]);


      user.listView()
        .title('All user') // default title is "[Entity_name] list"
        .description('List of users') // description appears under the title
        .infinitePagination(true) // load pages as the user scrolls
        .fields([
          nga.field('email', 'template')
            .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>'), // the default list field type is "string", and displays as a string
          nga.field('displayName'), // Date field type allows date formatting
        ])
        .listActions(['show', 'edit', 'delete']);


      user.editionView()
        .title('Edit user "{{ entry.values.name }}"') // title() accepts a template string, which has access to the entry
        .actions(['list', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
        .fields([
          user.listView().fields(),
          nga.field('description', 'text')// fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
        ]);

      category.showView() // a showView displays one entry in full page - allows to display more data than in a a list
        .fields([
          category.editionView().fields(), // reuse fields from another view in another order

        ]);

      category.listView()
        .title('All Category') // default title is "[Entity_name] list"
        .description('List of category of formations') // description appears under the title
        .infinitePagination(true) // load pages as the user scrolls
        .fields([
          nga.field('name'), // the default list field type is "string", and displays as a string
          nga.field('description', 'date'), // Date field type allows date formatting
        ])
        .listActions(['show', 'edit', 'delete']);

      category.creationView()
        .fields([
          nga.field('name') // the default edit field type is "string", and displays as a text input
            .attributes({placeholder: 'the category title'}) // you can add custom attributes, too
            .validation({required: true, minlength: 3, maxlength: 50}), // add validation rules for fields
          nga.field('description', 'text')// text field type translates to a textarea
            .attributes({placeholder: 'category description'})
            .validation({required: true, minlength: 10, maxlength: 300}), // add validation rules for fields

        ]);

      category.editionView()
        .title('Edit category "{{ entry.values.name }}"') // title() accepts a template string, which has access to the entry
        .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
        .fields([
          category.creationView().fields(), // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
          nga.field('formations', 'reference_many') // ReferenceMany translates to a select multiple
            .targetEntity(formation)
            .targetField(nga.field('name'))
            .cssClasses('col-sm-4'), // customize look and feel through CSS classes
        ]);

      category.showView() // a showView displays one entry in full page - allows to display more data than in a a list
        .fields([
          category.editionView().fields(), // reuse fields from another view in another order
          nga.field('slug')
            .label('slug')
        ]);


      formation.listView()
        .title('Formations')
        .perPage(10) // limit the number of elements displayed per page. Default is 30.
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


      formation.showView() // a showView displays one entry in full page - allows to display more data than in a a list
        .fields([
          formation.editionView().fields(), // reuse fields from another view in another order
          nga.field('previous', 'reference_many')
            .targetEntity(formation)
            .targetField(nga.field('name'))
        ]);

      formation.deletionView()
        .title('Deletion confirmation'); // customize the deletion confirmation message

      contact.listView()
        .title('All Contacts') // default title is "[Entity_name] list"
        .description('List of contacts') // description appears under the title
        .infinitePagination(true) // load pages as the user scrolls
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

      contact.showView() // a showView displays one entry in full page - allows to display more data than in a a list
        .fields([
          contact.listView().fields(),
          nga.field('message')
            .label('message')
        ]);


      contact.deletionView()
        .title('Deletion confirmation'); // customize the deletion confirmation message

      admin.menu(nga.menu()
          .addChild(nga.menu(contact).icon('<span class="glyphicon glyphicon-message-full"></span>')) // you can even use utf-8 symbols!
          .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>')) // you can even use utf-8 symbols!
          .addChild(nga.menu(category).icon('<span class="glyphicon glyphicon-file"></span>')) // customize the entity menu icon
          .addChild(nga.menu(formation).icon('<strong style="font-size:1.3em;line-height:1em">✉</strong>')) // you can even use utf-8 symbols!
          .addChild(nga.menu(media).icon('<span class="glyphicon glyphicon-file"></span>')) // you can even use utf-8 symbols!


      );

      nga.configure(admin);
    });
})();
