/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var EditMindCtrl = adminControllers.controller('EditMindCtrl', ['$scope', '$rootScope', '$location', '$modal', 'flash', 'mind', 'roles', 'lang', 'timezones', 'identity', 'identityService',
  function ($scope, $rootScope, $location, $modal, flash, mind, roles, lang, timezones, identity, identityService) {
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
					$rootScope.$broadcast('mind.post.edit', mind);
					flash.setMessage('Mind updated successfully!');
					$location.path('/administrator/result/minds/'+$scope.mind.id+'/1');
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
					$location.path('/administrator/result/minds/'+$scope.mind.id+'/0');
				}
			);
		};

		var doDelete = function () {
			$scope.mind.$delete(
				function(success) {
					flash.setMessage('Mind deleted successfully!');
					$location.path('/administrator/result/minds/'+$scope.mind.id+'/1');
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
					$location.path('/administrator/result/minds/'+$scope.mind.id+'/0');
				}
			);
		}

		$scope.delete = function () {
			var modalInstance = $modal.open({
				templateUrl: '/js/admin/partials/modals/confirm.html',
				controller: 'ConfirmModalCtrl',
			});

			modalInstance.result.then(function () {
				doDelete();
			}, function () {
				//nothing to do
			});
		};

		$scope.mind = mind;
		$scope.isSelf = identityService.isSelf(mind.id);
		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.langs = lang.list(identity.locale);
}]);

EditMindCtrl.resolve = {
  mind: ['mindFactory', '$q', '$route', '$location', 'flash', function(mindFactory, $q, $route, $location, flash) {
		var mindRequest = mindFactory.get({id:$route.current.params.mindId}).$promise;
		mindRequest.catch(function(reason) {
			flash.setMessage(reason.data);
			$location.path('/administrator/result/minds/0/1');
		});
		return mindRequest;

	 	/*var deferred = $q.defer();
	 	mindFactory.get({id:$route.current.params.mindId},
		  function(data){
			  deferred.resolve(data);
		  }, function(errorData) {
			  flash.setMessage(errorData.data);
				$location.path('/result/minds/0/1');
		});
		return deferred.promise;*/

  }],
  identity: ['identityService', '$location', function(identityService, $location) {
		var identityRequest = identityService.get();
		identityRequest.catch(function(reason) {
			$location.path('/');
		});
		return identityRequest;
  }]
};
