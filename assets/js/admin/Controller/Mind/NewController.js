/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


var NewMindCtrl = adminControllers.controller('NewMindCtrl', ['$scope', '$location', '$q', 'flash', 'roles', 'identity', 'lang', 'timezones', 'mindFactory',
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
					$location.path('/administrator/result/minds/'+success.id+'/1');
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
					$location.path('/administrator/result/minds/0/1');
			});
		};
}]);
