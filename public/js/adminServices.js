var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('minds', ['$resource',
  function($resource){
    return $resource('/api/admin/mind-list', {}, {
      query: {method:'GET', isArray:true}
    });
}]);

adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/api/admin/records/recover', {}, {
      query: {method:'GET', isArray:true}
    });
}]);