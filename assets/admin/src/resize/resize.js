import angular from 'angular';
import routing from './routing';

import ResizeController from './ResizeController';

export default angular.module('ai.resize',[])
  .controller('ResizeController', ResizeController)
  .config(routing);
