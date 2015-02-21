/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminControllers.controller('NewSensorCtrl', ['$scope', '$location', 'sensorStatus', 'flash', 'meteologistList', 'sensorsFactory',
  function ($scope, $location, sensorStatus, flash, meteologistList, sensorsFactory) {
		$scope.statusList = sensorStatus;
		$scope.meteologistList = meteologistList;
		$scope.topicList = sensorsFactory.getTopics();
		$scope.flash = flash;

		$scope.create = function() {
			$scope.sample1.topic = $scope.sensor.topic;
			$scope.sample2.topic = $scope.sensor.topic;
			$scope.sensor.samples = [$scope.sample1, $scope.sample2];
			sensorsFactory.resource().save($scope.sensor,
				function(success) {
					flash.setMessage('Sensor created successfully!');
					$location.path('/administrator/result/sensors/'+success.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (value) {
							flash.setMessage(value);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while creating the sensor.');
					}
					$location.path('/administrator/result/sensors/0/1');
			});
		};

		$scope.go = function (url) {
			$location.path(url);
		};
}]);
