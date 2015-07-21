import customComponents from './components/customComponents';
import customViews from './views/customViews';

export default angular.module('ai.dashboard.custom',[])
  .config(customViews)
  .config(customComponents)
