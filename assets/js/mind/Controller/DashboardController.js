/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', '$modal', 'identity', 'flash', 'sessionFactory', 'climat', /*'moment',*/ 'statementsFactory', 'statsFactory', 'recordsFactory', 'climateChartHelper', 'tableHelper',
    function ($scope, $location, $modal, identity, flash, sessionFactory, climat, /*moment,*/ statementsFactory, statsFactory, recordsFactory, climateChartHelper, tableHelper) {
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

			$scope.ViewStatement = function(statement) {
				statement.notread = false;
				$scope.editedStatement = statement;
				//open modal & mark as read
			};

			$scope.sendStatement = function() {
				$scope.editedStatement = undefined;
				$scope.sentConfirm = 'Message sent successfully!';
				setTimeout(function () {
					$scope.$apply( function () {
					$scope.sentConfirm = undefined;
					});
				}, 3000);
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
								climateChartHelper.load($scope, climat);
								//loadClimateChart(climat);
								//Generate the reports
								statementsFactory.generate({id: $scope.identity.id}).$promise
								.then(function (reports) {
									$scope.tableParams.reload();
									$scope.processing = false;
									$scope.newReports = true;
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
				$scope.show = 'reports';
				$scope.newReports = false;
				//$scope.tableParams.reload();
			};
			$scope.openClimate = function () {
				$scope.show = 'climate';
			};

			$scope.tableParams = tableHelper.new('statements-list', {id:$scope.identity.id});

			$scope.show = 'climate';
			$scope.processing = false;
			climateChartHelper.load($scope, climat);
}]);
