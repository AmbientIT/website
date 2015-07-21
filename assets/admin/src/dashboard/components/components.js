import mailTo from './adminMailTo/adminMailTo';
import picture from './adminPicture/adminPicture';
import repeter from './adminRelationRepeter/AdminRelationRepeter';
import select from './adminRelationSelect/AdminRelationSelect';
import selectCtrl from './adminRelationSelect/AdminRelationSelectController';
import resize from './resizeButton/resizeButton';

export default angular.module('ai.dashboard.components',[
  'ui.select'
])
  .controller('AdminRelationSelectController', selectCtrl)
  .directive('adminMailto', mailTo)
  .directive('adminPicture', picture)
  .directive('adminRelationRepeter', repeter)
  .directive('adminRelationSelect', select)
  .directive('resizeButton', resize);
