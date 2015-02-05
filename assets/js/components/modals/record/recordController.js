mindControllers.controller('RecordModalCtrl', function ($scope, $modalInstance, sensorsFactory) {
  $scope.close = function () {
    $modalInstance.close($scope.newRecords);
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
		console.log(sensorId);
		console.log(sampleId);
		$scope.newRecords = true;

		getNextRandomSensor();
	};

	$scope.newRecords = false;
	getNextRandomSensor();
});
