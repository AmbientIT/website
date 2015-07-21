import template from './resize.tpl.html!text';

export default ($stateProvider)=>{
  $stateProvider
    .state('resize', {
      url: '/resize/:slug',
      controller: 'ResizeController as ctrl',
      resolve: {
        media : ($http, $stateParams)=>{
          return $http.get('/api/media/'+$stateParams.slug)
            .success(function(data){
              return data;
            })
        }
      },
      template: template
    });
}
