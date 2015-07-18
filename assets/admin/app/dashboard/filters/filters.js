import sizeFilter from './fileSize/fileSizeFilter';
import selectFilter from './ui-select/ui-selectPropsFilter';

export default angular.module('ai.filters',[])
  .filter('size', sizeFilter)
  .filter('propsFilter',selectFilter);
