/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

angular.module('flashMsg', ['ui.bootstrap'])
.controller('ResultCtrl', ['$scope', '$location', 'flash', '$routeParams',
    function ($scope, $location, flash, $routeParams) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.result = $routeParams.result;
		$scope.returnRoute = '/' + $routeParams.object +'/edit/' + $routeParams.id;
		$scope.finishRoute = '/' + $routeParams.object;
		$scope.flash = flash;
}])
.controller('ConfirmModalCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}])
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
