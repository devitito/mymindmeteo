/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindServices.factory('recordsFactory', ['$resource', '$q', '$modal',  'statementsFactory', 'statsFactory', 'climateChartHelper', function($resource, $q, $modal,  statementsFactory, statsFactory, climateChartHelper){
	var factory = {};
	var resource = $resource('/record/:id', {id:'@id'}, {
		saveBulk: {method: 'POST', url: '/record/saveBulk'}
	});

	factory.save = function (mindid, records) {
		var deferred = $q.defer();
		resource.saveBulk({}, {records: records}).$promise
		.then(function (success) {
			deferred.resolve(success);
		})
		.catch(function (error) {
			deferred.reject(error);
		});
		//deferred.resolve('ok');
		return deferred.promise;
	}

	factory.launch = function (scope) {
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
			if (angular.isUndefined(records))
			{
				scope.processing = false;
			}
			else
			{
				if (records.length) {
					scope.processing = true;

					factory.save({id:scope.identity.id}, records)
					.then(function (success) {
						//update the climate
						statsFactory.climate(scope.identity.name)
						.then(function (climat) {
							climateChartHelper.load(scope, climat);
							//Generate the reports
							statementsFactory.generate({id: scope.identity.id}).$promise
							.then(function (reports) {
								scope.tableParams.reload();
								scope.processing = false;
								scope.newReports = true;
							})
							.catch(function (error) {
								scope.processing = false;
								scope.error = error;
							});
						});
					})
					.catch(function (err) {
						scope.processing = false;
						scope.error = err.data;
					});
				}
			}
		});
	};

	return factory;
}]);
