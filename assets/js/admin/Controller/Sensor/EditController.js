/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminControllers.controller('EditSensorCtrl', ['$scope', '$location', 'sensor', 'sensorStatus', 'flash', '$modal',
    function ($scope, $location, sensor, sensorStatus, flash, $modal) {
		$scope.statusList = sensorStatus;
		$scope.sensor = sensor;

		$scope.update = function() {
			$scope.sensor.$update(
				function(success) {
					flash.setMessage('Sensor updated successfully!');
					$location.path('/administrator/result/sensors/'+$scope.sensor.id+'/1');
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
					$location.path('/administrator/result/sensors/'+$scope.sensor.id+'/0');
				}
			);
		};

		var doDelete = function () {
			$scope.sensor.$delete(
				function(success) {
					flash.setMessage('Sensor deleted successfully!');
					$location.path('/administrator/result/sensors/'+$scope.sensor.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							flash.setMessage(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while deleting the sensor');
					}
					$location.path('/administrator/result/sensors/'+$scope.sensor.id+'/0');
				}
			);
		};

		$scope.delete = function () {
			var modalInstance = $modal.open({
			      templateUrl: '/js/components/modals/confirm/confirm.html',
			      controller: 'ConfirmModalCtrl',
			    });

			modalInstance.result.then(function () {
			      doDelete();
			    }, function () {
			      //nothing to do
			    });
		};

		$scope.go = function (url) {
			$location.path(url);
		};
}]);
