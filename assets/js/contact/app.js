angular.module('contact', [
  'ngMessages',
  'ngAnimate',
  'ui.select',
  'ui.bootstrap',
  'ui.router',
  'formly',
  'formlyBootstrap'
])
  .config(['$sceProvider','$locationProvider','$stateProvider',function($sceProvider, $locationProvider, $stateProvider){
    $sceProvider.enabled(false);

    $stateProvider
      .state('contact', {
        abstract:'true',
        url: '',
        templateUrl: '../templates/contact/form/nav.tpl.html',
        resolve: {
          formation: function(formationService){
            return formationService.findAll();
          }
        }
      })
      .state('contact.formations', {
        url: '/formations',
        templateUrl: '../templates/contact/form/formations.tpl.html',
        controller: 'ContactController as ctrl'
      })
    .state('contact.trainer', {
        url: '/formateur',
        templateUrl: '../templates/contact/form/trainer.tpl.html',
        controller: 'ContactController as ctrl'
      })
    .state('contact.dev', {
        url: '/dev',
        templateUrl: '../templates/contact/form/dev.tpl.html',
        controller: 'ContactController as ctrl'
      })

  }])
  .run(function($rootScope){
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      throw error;
    })
  });
