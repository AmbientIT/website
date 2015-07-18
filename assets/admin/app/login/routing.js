import template from './login.tpl.html!text';

export default ($stateProvider)=>{
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginController as ctrl',
      templateUrl: 'admin/app/login/login.tpl.html'
    });
}
