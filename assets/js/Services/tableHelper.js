/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindServices.factory("tableHelper", ['$filter', 'ngTableParams', 'statementsFactory', function($filter, ngTableParams, statementsFactory) {
	var factory = {};

	factory.new = function(table, options) {
		if (table == 'statements-list') {
			return new ngTableParams({
				page: 1,            // show saved page
				count: 10,           // count per page
				sorting: {
            createdAt: 'desc'     // initial sorting
        }
			}, {
				counts: [], // hide page counts control
				total:0, // length of data
				getData: function($defer, params) {
					statementsFactory.bymind({id:options.id, page: params.page(), count: params.count()}).$promise
					.then(function (reports) {
						// update table params
						params.total(reports.total);
						// use build-in angular filter
						var orderedReports = params.sorting() ? $filter('orderBy')(reports.data, params.orderBy()) : reports.data;
						// set new data
						$defer.resolve(orderedReports);
					})
				}
			});
		}
	};

	return factory;
}]);
