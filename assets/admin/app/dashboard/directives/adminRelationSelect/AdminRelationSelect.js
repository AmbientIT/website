import template from './admin-relation-select.tpl.html!text';

export default ($http)=>{
  return {
    scope: {
      relationName: '@',
      attrName: '@',
      data: '='
    },
    template: template,
    link: function(scope,element,attrs){
      if(!scope.data){
        scope.data[scope.relationName] = [];
      }
      $http.get('/api/'+scope.relationName)
        .success(function(data){
          scope.entities = data;
        })
        .error(function(err){
          console.log(err);
        })
    }
  }
}
