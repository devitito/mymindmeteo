var adminServices = angular.module('adminServices', ['ngResource']);

/*adminServices.factory('mindFactory', ['$resource', function($resource){
	var mindFactory = {};
	
	mindFactory.fetchAll = function () {
		return $resource('/api/admin/minds', {}, {
    		query: {method:'GET', isArray:true}
        });
	}
	
	mindFactory.fetch = function (id) {
		return $resource('/api/admin/mind/get', {}, {
    		query: {method:'GET', params:{mindId: id}, isArray:true}
        });
	}

	return mindFactory;
}]);*/

adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/api/admin/minds/:id');
}]);

adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/api/admin/records/recover', {}, {
      query: {method:'GET', isArray:true}
    });
}]);