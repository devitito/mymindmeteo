/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', '$modal', 'identity', 'flash', 'sessionFactory', 'climat', 'moment', 'ngTableParams', 'statementsFactory', 'statsFactory', 'recordsFactory',
    function ($scope, $location, $modal, identity, flash, sessionFactory, climat, moment, ngTableParams, statementsFactory, statsFactory, recordsFactory) {
			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.identity = identity;

			$scope.logout = function () {
				sessionFactory.destroy()
				.then(function(success) {
					$location.path('/');
				})
				.catch(function(error) {
					//todo display error
				});
			};

			$scope.ViewStatement = function(statementId) {
				//open modal & mark as read
			};

			$scope.record = function () {
				var modalInstance = $modal.open({
					templateUrl: '/js/components/modals/record/record.html',
					controller: 'RecordModalCtrl',
					resolve: {
						identity: function(identityService, $location) {
							var identityRequest = identityService.get();
							identityRequest.catch(function(reason) {
								$location.path('/');
							});
							return identityRequest;
						}
					}
				});

				modalInstance.result
				.then(function (records) {
					if (records.length) {
						$scope.processing = true;

						recordsFactory.save({id:$scope.identity.id}, records)
						.then(function (success) {
							//update the climate
							statsFactory.climate($scope.identity.name)
							.then(function (climat) {
								loadClimateChart(climat);
								//Generate the reports
								statementsFactory.generate({id: $scope.identity.id}).$promise
								.then(function (reports) {
								//	$scope.tableParams.data.unshift(reports);
									$scope.tableParams.reload();
									$scope.processing = false;
								//	$scope.$apply(function () {
										$scope.newReports = true;
								//	});
								/*	setTimeout(function() {
										$scope.processing = false;
										$scope.$apply(function () {
											$scope.newReports = true;
										});
									}, 5000);*/
								})
								.catch(function (error) {
									$scope.processing = false;
									$scope.error = error;
								});
							});
						})
						.catch(function (err) {
							$scope.processing = false;
							$scope.error = err.data;
						});
					}
				});
			};

			$scope.openReportList = function () {
				$scope.newReports = false;
				$scope.tableParams.reload();
			};

			$scope.tableParams = new ngTableParams({
				page: 0,            // show saved page
				count: 10,           // count per page
			}, {
				counts: [], // hide page counts control
				total:0, // length of data
				getData: function($defer, params) {
					statementsFactory.bymind({id:$scope.identity.id}).$promise
					.then(function (reports) {
						// update table params
							params.total(reports.length);
							// set new data
							$defer.resolve(reports);
					})
				}
			});

			var convertToDataTable = function (json){
      	var d= {};
      	d.rows = json.map(function(item){
      	  return {
        		"c": [{
        			"v": moment(item.date).format('YYYY-MMM-D')
        		},
        	/*	{
        			"v": item.love
        		},
        		{
        			"v": item.health
        		},
						{
        			"v": item.money
        		},*/
						{
        			"v": item.mood
        		}]
        	}
      	});
      	d.cols =  [{ label: "Days", type: "string"},
					/*{ label: "Love", type: "number"},
					{ label: "Health", type: "number"},
					{ label: "Money", type: "number"},*/
					{ label: "Mood", type: "number"}, ];
      	d.p = null;

        return d;
     }

			var loadClimateChart = function(climat) {
				try {
				if (climat.error) {
					$scope.message = climat.error;
					$scope.total = '-';
					$scope.sunny = '-';
					$scope.rainy = '-';
				}
				else if (!climat.data.length) {
					$scope.message = 'No meteo data captured.';
					$scope.total = climat.info.total;
					$scope.sunny = climat.info.sunny;
					$scope.rainy = climat.info.rainy;
				}
				else {
					var climate = {};
					climate.options = {
						'is3D':true,
						fontSize: 14,
						colors : [/*'#FF0000',*/ '#00ADEF'/*, '#85bb65', 'yellow'*/],
						legend : {position: 'none'},
						chartarea: {left:0,top:0,width:'100%',height:'100%'},
						pointSize : 4,
						curveType: 'function',
						'hAxis': {
							format: 'yyyy-MM-dd',
							slantedText: false,
							textPosition : 'none',
							viewWindowMode: 'maximized',

						},
						vAxis : {
							//gridlines: { count : 2},
							//ticks: [{v:-10, f:'Devastation'}, {v:-5, f:'Wind and rain'}, {v:0, f:'Not sunny Not raining'}, {v:5, f:'Spring impression'}, {v:10, f:'T shirt and bermuda'}],
							ticks: [{v:-10, f:':(('}, {v:-5, f:':('}, {v:0, f:':|'}, {v:5, f:':)'}, {v:10, f:':))'}],
							maxValue : 10,
							minValue : -10,
							//textPosition : 'in',
						},
					};
					climate.type = 'LineChart';
					climate.data = convertToDataTable(climat.data);
					$scope.climate = climate;

					$scope.total = climat.info.total;
					$scope.sunny = climat.info.sunny;
					$scope.rainy = climat.info.rainy;
				};
			} catch (e) {
				$scope.message = "We couldn't retrieve your climate data. Please try again";
			};
			};

			$scope.processing = false;
			loadClimateChart(climat);
}]);
