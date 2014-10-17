var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('minds', ['$resource',
  function($resource){
    return $resource('/api/admin/mind-list', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);