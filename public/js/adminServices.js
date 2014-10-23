var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/api/admin/minds/:id', {id: '@id'}, {
      update: {method:'PUT'}
    });
}]);

adminServices.factory('roles', [function(){
	return ['guest', 'demo', 'mind', 'meteologist', 'validator', 'admin'];
}]);

adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/api/admin/records/recover', {}, {
      query: {method:'GET', isArray:true}
    });
}]);

adminServices.factory("flash", function($rootScope) {
	  var queue = [];
	  var currentMessage = "";

	  $rootScope.$on("$routeChangeSuccess", function() {
	    currentMessage = queue.shift() || "";
	  });

	  return {
	    setMessage: function(message) {
	      queue.push(message);
	    },
	    getMessage: function() {
	      return currentMessage;
	    }
	  };
	});