

angular.module('mind', ['ngResource', 'i18n'])
.controller('mindListCtrl', ['$scope', '$location', 'minds', 'lang', 'identity',
    function ($scope, $location, minds, lang, identity) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };

	    $scope.langtools = lang;
	    $scope.locale = identity.locale;
			console.log($scope.locale);

	    if (angular.isArray(minds))
				$scope.minds = minds;
			else
				$scope.error = minds;
}])
.factory('mindFactory', ['$resource', function($resource){
	return $resource('/mind/:id', {id: '@id'}, {
      update: {method:'PUT'},
			fetchByRole: {method: 'GET', url:'/mind/fetchByRole', isArray:true}
    });
}]);
