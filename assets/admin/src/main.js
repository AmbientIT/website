'use strict';

/**
 * ambient-it admin ui
 * written in angular 1.x with ECMA6 syntax
 * use jspm babel and system.js
 * @author AmbientIT <charles.jacquin@ambient-it.net>
 */

import 'github:marmelab/ng-admin@0.7.0/build/ng-admin.min.css!';
import 'github:angular-ui/ui-select@0.12.0/dist/select.min.css!';
import 'github:FezVrasta/bootstrap-material-design@0.3.0/dist/css/material-fullpalette.min.css!';

import angular from 'angular';

import 'github:sahat/satellizer@0.11.2'
import 'github:marmelab/ng-admin@0.7.0';
import 'github:angular-ui/ui-select@0.12.0';

import login from './login/login';
import dashboard from './dashboard/dashboard';
import resize from './resize/resize';

angular.module('ai.admin', [
  'ng-admin',
  'satellizer',
  'ui.select',
  login.name,
  dashboard.name,
  resize.name
])
  .run(($rootScope, $auth, $state)=>{
    $rootScope.isLoading = false;

    if(!$auth.isAuthenticated())
      $state.go('login');

    //$rootScope.$on('$stateChangeSuccess', function () {
    //  $rootScope.displayBanner = $location.$$path === '/dashboard';
    //});
  })
  .config((RestangularProvider, $locationProvider)=> {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase:true
    });
      // use the custom query parameters function to format the API request correctly
      //RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
      //  if (operation == "getList") {
      //
      //  }
      //  return {params: params};
      //});
    });
