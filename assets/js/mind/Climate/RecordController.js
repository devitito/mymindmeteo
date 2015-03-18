/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindControllers.controller('mindClimateRecordCtrl', [
	'$scope',
	'$location',
	'$timeout',
	'identity',
	'sessionFactory',
	'sensorList',
	'recordsFactory',
  function ($scope, $location, $timeout, identity, sessionFactory, sensorList, recordsFactory) {
		$scope.processing = false;

		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.identity = identity;

		$scope.showError = function (error) {
			$scope.processing = false;
			$scope.error = error;
			$timeout(function() {
				$scope.error = undefined;
				$location.path('mind/dashboard/'+$scope.identity.name);
			}, 5000);
		};

		$scope.close = function () {
			if ($scope.records.length) {
				$scope.processing = true;

				recordsFactory.save({id:$scope.identity.id}, $scope.records)
				.then(function (success) {
					$location.path('mind/dashboard/'+$scope.identity.name);
				})
				.catch(function (err) {
					$scope.showError(err.data);
				});
			}
			else
				$location.path('mind/dashboard/'+$scope.identity.name);
  	};

		/**
		 * Return the index in sensorList for the next sensor
		 * Return -1 if all the index have been used (=all questions have been asked)
		 */
		var getNextRandomSensorIndex = function() {
			var index = -1;

			if (indexlist.length == sensorList.length)
				return -1;

			while (index == -1 || indexlist.indexOf(index) != -1) {
				index = randomIntFromInterval(0, sensorList.length-1);
			};

			indexlist.push(index);
			return index;
		};

		$scope.puhlease = function () {
			//skype this test
			sensorIndex = getNextRandomSensorIndex();
			console.log(sensorIndex);
			if (sensorIndex == -1)
				$scope.end = true;
			else
				$scope.sensor = sensorList[sensorIndex]._source;
		};

		$scope.record = function (sensorId, sampleId) {
			$scope.records.push({mind_id: identity.id, sensor_id: sensorId, sample_id: sampleId});
			$scope.puhlease();
		};

		var indexlist = [];
		var sensorIndex = getNextRandomSensorIndex();
		$scope.end = false;
		$scope.records = [];
		$scope.sensor = sensorList[sensorIndex]._source;
}]);

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}
