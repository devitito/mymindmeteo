

angular.module('mind', ['ngResource', 'i18n', 'flashMsg', 'i18n', 'timezone'])
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
.controller('NewMindCtrl', ['$scope', '$location', '$q', 'flash', 'roles', 'identity', 'lang', 'timezones', 'mindFactory',
    function ($scope, $location, $q, flash, roles, identity, lang, timezones, mindFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.langs = lang.list(identity.locale);
		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.flash = flash;

		$scope.create = function() {
			mindFactory.save($scope.mind,
				function(success) {
					flash.setMessage('Mind created successfully!');
					$location.path('/result/minds/'+success.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (value) {
							flash.setMessage(value);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while creating the mind.');
					}
					$location.path('/result/minds/0/1');
			});
		};
}])
.controller('EditMindCtrl', ['$scope', '$rootScope', '$location', '$modal', 'flash', 'user', 'roles', 'lang', 'timezones', 'identity', 'identityService',
  function ($scope, $rootScope, $location, $modal, flash, user, roles, lang, timezones, identity, identityService) {
		$scope.go = function (url) {
			$location.path(url);
		};

	/*	$rootScope.$on("$routeChangeError", function () {

			$location.path('/');
		});*/

		$rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
          console.log("failed to change routes");
          console.log(current);
          console.log(event);
		//$location.path('/');
        });

		$scope.update = function() {
			$scope.mind.$update(
				function(success) {
					$rootScope.$broadcast('mind.post.edit', user);
					flash.setMessage('Mind updated successfully!');
					$location.path('/result/minds/'+$scope.mind.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							flash.setMessage(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while applying the changes');
					}
					$location.path('/result/minds/'+$scope.mind.id+'/0');
				}
			);
		};

		var doDelete = function () {
			$scope.mind.$delete(
				function(success) {
					flash.setMessage('Mind deleted successfully!');
					$location.path('/result/minds/'+$scope.mind.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							flash.setMessage(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while deleting the mind');
					}
					$location.path('/result/minds/'+$scope.mind.id+'/0');
				}
			);
		}

		$scope.delete = function () {
			var modalInstance = $modal.open({
				templateUrl: '/templates/administrator/modals/confirm.html',
				controller: 'ConfirmModalCtrl',
			});

			modalInstance.result.then(function () {
				doDelete();
			}, function () {
				//nothing to do
			});
		};

		$scope.mind = user;
		$scope.isSelf = identityService.isSelf(user.id);
		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.langs = lang.list(identity.locale);
}])
.factory('mindFactory', ['$resource', function($resource){
	return $resource('/mind/:id', {id: '@id'}, {
      update: {method:'PUT'},
			fetchByRole: {method: 'GET', url:'/mind/fetchByRole', isArray:true}
    });
}])
.factory('roles', [function(){
		return [{code:'guest', name:'Guest'},
		        {code:'demo', name:'Demo'},
		        {code:'mind', name:'Mind'},
		        {code:'meteologist', name:'Meteologist'},
		        {code:'validator', name:'Validator'},
		        {code:'admin', name:'Administrator'}];
}])
.directive('ngUnique', ['$http', function ($http) {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			elem.on('blur', function (evt) {
				scope.$apply(function () {
					var val = elem.val();
					var field = attrs.ngUnique;
					var ajaxConfiguration = { method: 'POST', url: '/mind/validate-'+field, data: elem.serialize(), headers: {'Content-Type': 'application/x-www-form-urlencoded'} };
					$http(ajaxConfiguration)
						.success(function(data, status, headers, config) {
							ctrl.$setValidity('unique', angular.fromJson(data).valid);
						});
				});
			});
		}
	}
}
]);
