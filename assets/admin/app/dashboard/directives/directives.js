import mailTo from './adminMailTo/adminMailTo';
import picture from './adminPicture/adminPicture';
import repeter from './adminRelationRepeter/AdminRelationRepeter';
import select from './adminRelationSelect/AdminRelationSelect';

export default angular.module('ai.dashboard.directives',[
  'ui.select'
])
  .directive('adminMailto', mailTo)
  .directive('adminPicture', picture)
  .directive('adminRelationRepeter', repeter)
  .directive('adminRelationSelect', select);
