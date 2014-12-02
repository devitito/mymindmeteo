/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var EditMindCtrl = adminControllers.controller('EditMindCtrl', ['$scope', '$rootScope', '$location', '$modal', 'mind', 'roles', 'flash', 'lang', 'timezones', 'identity', 'identityService',
    function ($scope, $rootScope, $location, $modal, mind, roles, flash, lang, timezones, identity, identityService) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.update = function() {
			$scope.mind.$update(
				function(success) {
					$rootScope.$broadcast('mind.post.edit', mind);
					flash.setMessage('Mind updated successfully!');
					$location.path('/edited/result/minds/'+$scope.mind.id+'/1');
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
					$location.path('/edited/result/mind/'+$scope.mind.id+'/0');
				}
			);
		};

		var doDelete = function () {
			$scope.mind.$delete(
				function(success) {
					flash.setMessage('Mind deleted successfully!');
					$location.path('/deleted/minds/'+$scope.mind.id+'/1');
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
					$location.path('/deleted/minds/'+$scope.mind.id+'/0');
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

		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.langs = lang.list(identity.locale);

		if (angular.isObject(mind)) {
			$scope.mind = mind;
			$scope.isSelf = identityService.isSelf(mind.id);
		}
		else {
			flash.setMessage('An error occured while fetching the data');
			$location.path('/edited/result/minds/0/1');
		}
}]);

EditMindCtrl.resolve = {
  mind: function(mindFactory, $q, $route) {
	  var deferred = $q.defer();
	  mindFactory.get({id:$route.current.params.mindId},
		  function(data){
			  deferred.resolve(data);
		  }, function(errorData) {
			  deferred.resolve('An error occured while retreiving the requested data');
	});
	return deferred.promise;
  },
  identity: function(identityService, $q) {
		var deferred = $q.defer();
		return identityService.get(deferred);
  }
};
