import template from './admin-relation-repeter.tpl.html!text';

export default ()=>{
  return {
    scope: {
      data: '=',
      entityName: '@'
    },
    template: template,
    link: function(scope){
      console.log(scope.entityName)
    }
  }
}
