

angular.module('mind', ['ngResource'])
.factory('mindFactory', ['$resource', function($resource){
	return $resource('/mind/:id', {id: '@id'}, {
      update: {method:'PUT'},
			fetchByRole: {method: 'GET', url:'/mind/fetchByRole', isArray:true}
    });
}]);
