(function () {
  'use strict';

  var app = angular.module('myApp', ['ng-admin']);

  app.controller('main', function ($scope, $rootScope, $location) {
    $rootScope.$on('$stateChangeSuccess', function () {
      $scope.displayBanner = $location.$$path === '/dashboard';
    });
  });

  app.config(function (NgAdminConfigurationProvider, RestangularProvider) {
    var nga = NgAdminConfigurationProvider;

    function truncate(value) {
      if (!value) {
        return '';
      }

      return value.length > 50 ? value.substr(0, 50) + '...' : value;
    }

    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
      if (operation == "getList") {
        // custom pagination params
        if (params._page) {
          params._start = (params._page - 1) * params._perPage;
          params._end = params._page * params._perPage;
        }
        delete params._page;
        delete params._perPage;
        // custom sort params
        if (params._sortField) {
          params._sort = params._sortField;
          delete params._sortField;
        }
        // custom filters
        if (params._filters) {
          for (var filter in params._filters) {
            params[filter] = params._filters[filter];
          }
          delete params._filters;
        }
      }
      return {params: params};
    });

    var admin = nga.application('AmbientIT Back-Office') // application main title
      .baseApiUrl('http://localhost:1337/api/'); // main API endpoint

    // define all entities at the top to allow references between them
    var formation = nga.entity('formation'); // the API endpoint for posts will be http://localhost:3000/posts/:id

    var category = nga.entity('category')
      .identifier(nga.field('id')); // you can optionally customize the identifier used in the api ('id' by default)


    // set the application entities
    admin
      .addEntity(formation)
      .addEntity(category);

    //// customize entities and views
    //
    //contact.dashboardView() // customize the dashboard panel for this entity
    //    .title('Recent contact')
    //    .order(1) // display the post panel first in the dashboard
    //    .perPage(10) // limit the panel to the 5 latest posts
    //    .fields([nga.field('title').isDetailLink(true).map(truncate)]); // fields() called with arguments add fields to the view

    category.listView()
      .title('All Category') // default title is "[Entity_name] list"
      .description('List of category of formations') // description appears under the title
      .infinitePagination(true) // load pages as the user scrolls
      .fields([
        nga.field('id').label('ID'), // The default displayed name is the camelCase field name. label() overrides id
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
        nga.field('id'),
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
        nga.field('price', 'number')
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
        nga.field('program', 'wysiwyg')
          .label('Program'),
        nga.field('duration', 'number')
          .label('duration'),
        nga.field('price', 'number')
          .label('Price'),
        nga.field('slides')
          .label('slides'),
        nga.field('home', 'boolean')
          .label('homePage'),
        nga.field('next', 'reference_many')
          .targetEntity(formation)
          .targetField(nga.field('name')),
        nga.field('previous', 'reference_many')
          .targetEntity(formation)
          .targetField(nga.field('name'))
      ]);

    formation.editionView()
      .fields(formation.creationView().fields());


    formation.showView() // a showView displays one entry in full page - allows to display more data than in a a list
      .fields([
        nga.field('id'),
        formation.editionView().fields(), // reuse fields from another view in another order
        nga.field('slug')
          .label('slug')
      ]);

    formation.deletionView()
      .title('Deletion confirmation'); // customize the deletion confirmation message


    admin.menu(nga.menu()
        .addChild(nga.menu(category).icon('<span class="glyphicon glyphicon-file"></span>')) // customize the entity menu icon
        .addChild(nga.menu(formation).icon('<strong style="font-size:1.3em;line-height:1em">✉</strong>')) // you can even use utf-8 symbols!
    );

    nga.configure(admin);
  });
})();
