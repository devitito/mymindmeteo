/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminControllers.controller('sensorsCtrl', ['$scope',  'ngTableParams', '$resource', '$timeout', '$location', 'sensorsCache', 'sensorFactory',
    function ($scope, ngTableParams, $resource, $timeout, $location, sensorsCache, sensorFactory) {
			var timer;
			var prevent = false;
			$scope.suggestions = [];
			$scope.filterTxt = sensorsCache.get('fitlerTxt');

			$scope.tableParams = new ngTableParams({
				page: 1,            // show first page
				count: 10,           // count per page
				filter: $scope.filterTxt
			}, {
				counts: [], // hide page counts control
				total:0, // length of data
				getData: function($defer, params) {
					$scope.suggestions = [];
					sensorFactory.query(params.url(), function(data) {
						$timeout(function() {
							// update table params
							params.total(data.total);
							// set new data
							$defer.resolve(data.result);
							prevent = false;
						}, 500);
					});
				}
			});

			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.doFilter = function () {
				prevent = true;
				$scope.tableParams.parameters({'filter':$scope.filterTxt}, true);
				$scope.tableParams.page(1);
				sensorsCache.set('fitlerTxt', $scope.filterTxt);
				//table is reloaded when params changes
				//$scope.tableParams.reload();
			};

			var doSuggest = function () {
				prevent = true;
				sensorFactory.suggest({'filter':$scope.filterTxt},
					function(success) {
						$scope.suggestions = success;
						prevent = false;
					},
					function(errors) {
						$scope.suggestions = [];
						prevent = false;
					}
				);
			};

			$scope.suggest = function(event) {
				$scope.suggestions = [];
				$timeout.cancel(timer);
				if (($scope.filterTxt.length > 3) && (event.keyCode != 13) && (prevent == false)) {
					timer = $timeout(doSuggest, 500);
				}
			};
}]);
