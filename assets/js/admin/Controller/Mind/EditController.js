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

		$scope.update = function() {
			$scope.mind.$update(
				function(success) {
					$rootScope.$broadcast('mind.post.edit', mind);
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
  mind: function(mindFactory, $q, $route, $location, flash) {
		var mindRequest = mindFactory.get({id:$route.current.params.mindId}).$promise;
		mindRequest.catch(function(reason) {
			flash.setMessage(reason.data);
			$location.path('/result/minds/0/1');
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

  },
  identity: function(identityService, $q, $location) {
		var deferred = $q.defer();
		var identityRequest = identityService.get(deferred);
		identityRequest.catch(function(reason) {
			//flash.setMessage(reason.data);
			$location.path('/error');
		});
		return identityRequest;
  }
};
