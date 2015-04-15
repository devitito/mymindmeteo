

angular.module('helper', ['ngTable', 'statement'])
.factory("tableHelper", ['$filter', 'ngTableParams', 'statementsFactory', function($filter, ngTableParams, statementsFactory) {
	var factory = {};

	factory.new = function(table, options) {
		if (table == 'statements-list') {
			return new ngTableParams({
				page: 1,            // show saved page
				count: 3,           // count per page
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
}])
.directive('loadingContainer', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var loadingLayer = angular.element('<div class="loading"></div>');
            element.append(loadingLayer);
            element.addClass('loading-container');
            scope.$watch(attrs.loadingContainer, function(value) {
                loadingLayer.toggleClass('ng-hide', !value);
            });
        }
    };
})
.directive('equalsTo', [function () {
    /*
     * <input type="password" ng-model="Password" />
     * <input type="password" ng-model="ConfirmPassword" equals-to="Password" />
     */
    return {
        restrict: 'A', // S'utilise uniquement en tant qu'attribut
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var check = function () {
                //Valeur du champs courant
                var v1 = scope.$eval(attrs.ngModel); // attrs.ngModel = "confirmedpassword"

                //valeur du champ à comparer
                var v2 = scope.$eval(attrs.equalsTo).$viewValue; // attrs.equalsTo = "Password"
                return v1 == v2;
            };
            scope.$watch(check, function (isValid) {
                // Défini si le champ est valide
                control.$setValidity("equalsTo", isValid);
            });
        }
    };
}]);
