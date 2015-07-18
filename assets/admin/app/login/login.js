import angular from 'angular';
import 'github:sahat/satellizer@0.11.2';
import LoginController from './LoginController';
import routing from './routing';

export default angular.module('ai.login',[
  'satellizer'
])
  .controller('LoginController', LoginController)
  .config(routing)
  .config(($authProvider)=>{
    //dev
    $authProvider.google({
      clientId: '599047877515-mqahp4fo89j1lt9mlnsg884sht1ijslk.apps.googleusercontent.com'
    });
    //prod
    //$authProvider.google({
    //  clientId: '599047877515-s9cjabmt7uadtvtii2gqekh3g1pjjknr.apps.googleusercontent.com'
    //});
  });
