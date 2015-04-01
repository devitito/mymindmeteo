

angular.module('report', ['session', 'i18n', 'ngResource'])
.controller('ReportListCtrl', ['$scope', '$location', 'reports', 'lang', 'identity',
    function ($scope, $location, reports, lang, identity) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };

	    if (angular.isArray(reports))
				$scope.reports = reports;
			else
				$scope.error = reports;
}])
.factory('reportsFactory', ['$resource', function($resource){
	var factory = $resource('/report/:id', {id:'@id'}, {});
	return factory;
}])
.factory('reportCategories', [function(){
	var factory = {};

	factory.img = function(category) {
		for (var i = 0; i < this.categories.length; i++) {
			if (this.categories[i].code == category) {
				return this.categories[i].img;
			}
		}
	};

	factory.label = function(category) {
		for (var i = 0; i < this.categories.length; i++) {
			if (this.categories[i].code == category) {
				return this.categories[i].name;
			}
		}
	};

	factory.categories = [
		{code:'pro', name:'Professional', img:'images/pro.png'},
		{code:'friends', name:'Friends', img:'images/friends.png'},
		{code:'family', name:'Family', img:'images/family.png'},
		{code:'lover', name:'Lover', img:'images/lover.png'}
	];

	return factory;
}])
.factory('reportRanges', [function(){
	var factory = {};

	factory.ranges = [
		{code:'highest', name:'Highest', value:{min: 7.01, max: 10}},
		{code:'high', name:'High', value:{min: 2.01, max: 7.00}},
		{code:'zero', name:'Neither high nor low', value:{min: -2.00, max: 2.00}},
		{code:'low', name:'Low', value:{min: -7.00, max: -2.01}},
		{code:'lowest', name:'Lowest', value:{min: -10, max: -7.01}}
	];

	factory.label = function (range) {
		for (var i = 0; i < this.ranges.length; i++) {
			if (this.ranges[i].code == range) {
				return this.ranges[i].name;
			}
		}
	};

	return factory;
}]);
