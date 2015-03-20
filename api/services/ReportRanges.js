/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.ranges = [
	{code:'highest', name:'Highest', value:{min: 7.01, max: 10}},
	{code:'high', name:'High', value:{min: 2.01, max: 7.00}},
	{code:'zero', name:'Neither high nor low', value:{min: -2.00, max: 2.00}},
	{code:'low', name:'Low', value:{min: -7.00, max: -2.01}},
	{code:'lowest', name:'Lowest', value:{min: -10, max: -7.01}}
];

module.exports.code2range = function(code) {
	switch (code) {
		case 'highest':
			return {min: 3.00, max: 10};
			break;
		case 'high':
			return {min: 0.50, max: 2.99};
			break;
		case 'zero':
			return {min: -0.50, max: 0.49};
			break;
		case 'low':
			return {min: -3.00, max: -0.51};
			break;
		case 'lowest':
			return {min: -10, max: -3.01};
			break;
		default:
				break;
	}
};

module.exports.value2code = function(value) {
	if (value == undefined)
		return value;

	value = value.toFixed(2);
	for (var i = 0; i < this.ranges.length; i++) {
		if ((value >= this.ranges[i].value.min) && (value <= this.ranges[i].value.max)) {
			return this.ranges[i].code;
		}
	}
};
