mindControllers.controller('RecordModalCtrl', function ($scope, $modalInstance, sensorsFactory, identity) {
  $scope.close = function () {
    $modalInstance.close($scope.records);
  };

	var getNextRandomSensor = function () {
		sensorsFactory.getRandom()
		.then(function (sensor) {
			 $scope.sensor = sensor;
		})
		.catch(function (error) {
			$modalInstance.close();
		});
	};

  $scope.puhlease = function () {
    //$modalInstance.dismiss();
		//skype this test
		getNextRandomSensor();
  };

	$scope.record = function (sensorId, sampleId) {
		$scope.records.push({mind_id: identity.id, sensor_id: sensorId, sample_id: sampleId});
		getNextRandomSensor();
	};

	$scope.records = [];
	getNextRandomSensor();
});
