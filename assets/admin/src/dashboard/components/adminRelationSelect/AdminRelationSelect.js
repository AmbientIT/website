import template from './admin-relation-select.tpl.html!text';

export default ()=>{
  return {
    scope: {},
    bindToController:{
      relationName: '@',
      attrName: '@',
      data: '='
    },
    controller: function($http){
      var self = this;
      self.querySearch = querySearch;
      self.entities = [];
      self.filterSelected = false;

      if(!this.data[this.attrName]){
        this.data[this.attrName] = [];
      }
      /**
       * Search for contacts.
       */
      function querySearch (query) {
        var results = query ?
          self.entities.filter(createFilterFor(query)) : [];
        return results;
      }
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
          return (contact.slug.indexOf(lowercaseQuery) != -1);;
        };
      }
      $http.get('/api/'+this.relationName)
        .success(function(data){
          console.log(data)
          self.entities = data;
        })
        .error(function(err){
          console.log(err);
        });

    },
    controllerAs: 'ctrl',
    template: template
  }
}
