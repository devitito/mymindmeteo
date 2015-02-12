/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindServices.factory("climateChartHelper", function(emociconeService) {
	var factory = {};

	factory.load = function ($scope, climat) {
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
				pointSize : 6,
				lineWidth: 3,
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
					textStyle: { fontSize: 20, bold: true, color: '#808080'},
					maxValue : 10,
					minValue : -10,
					//textPosition : 'in',
				},
			};
			climate.type = 'LineChart';
			climate.data = convertToDataTable(climat.data, $scope);
			$scope.climate = climate;

			$scope.total = climat.info.total;
			$scope.sunny = climat.info.sunny;
			$scope.rainy = climat.info.rainy;
		};
	} catch (e) {
		$scope.message = "We couldn't retrieve your climate data. Please try again";
	};
};

var convertToDataTable = function (json, $scope){
	var d= {};
	var newestItem = {};
	newestItem.date = moment('2014-06-01');
	d.rows = json.map(function(item){
		//Get the newest item in order to set the emocicones
		if (moment(item.date).isAfter(moment(newestItem.date)))
			newestItem = item;

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
					{ l	abel: "Health", type: "number"},
					{ label: "Money", type: "number"},*/
						 { label: "Mood", type: "number"}, ];
	d.p = null;

	//Set the emocicones
	console.log(newestItem.date);
	$scope.emocicone = {};
	$scope.emocicone.love = emociconeService.eval(newestItem.love);
	$scope.emocicone.health = emociconeService.eval(newestItem.health);
	$scope.emocicone.money = emociconeService.eval(newestItem.money);

	return d;
};

	return factory;
});
