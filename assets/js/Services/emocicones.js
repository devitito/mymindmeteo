/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindServices.factory("emociconeService", function(reportRanges) {
	var factory = {};
	var ranger = {};

	var between = function (x, min, max) {
  	return x >= min && x <= max;
	};

	var getRange = function(value) {

		reportRanges.forEach(function(range) {
			if (between(value, range.value.min, range.value.max)) {
				ranger = range;
			}
		});
	};

	factory.eval = function(value) {
		getRange(value);
		switch (ranger.code) {
			case 'highest' :
				return ':))';
				break;
			case 'high':
				return ':)';
				break;
			case 'zero':
				return ':|';
				break;
			case 'low':
				return ':(';
				break;
			case 'lowest':
				return ':((';
				break;
			default:
				return '-';
				break;
		};
	};

	return factory;
});
