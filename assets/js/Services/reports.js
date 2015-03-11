/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminServices.factory('reportsFactory', ['$resource', function($resource){
	var factory = $resource('/report/:id', {id:'@id'}, {});
	return factory;
}]);

adminServices.factory('reportCategories', [function(){
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
}]);

adminServices.factory('reportRanges', [function(){
	var factory = {};

	factory.ranges = [
		{code:'highest', name:'Highest', value:{min: 3.00, max: 10}},
		{code:'high', name:'High', value:{min: 0.50, max: 2.99}},
		{code:'zero', name:'Neither high nor low', value:{min: -0.50, max: 0.49}},
		{code:'low', name:'Low', value:{min: -3.00, max: -0.51}},
		{code:'lowest', name:'Lowest', value:{min: -10, max: -3.01}}
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
