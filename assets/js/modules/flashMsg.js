/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

angular.module('flashMsg', [])
  .factory("flash", ['$rootScope' ,function($rootScope) {
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
}]);
