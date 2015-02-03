/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', 'identity', 'flash', 'sessionFactory', 'climat', 'moment',
    function ($scope, $location, identity, flash, sessionFactory, climat, moment) {
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

			var convertToDataTable = function (json){
      	var d= {};
      	d.rows = json.map(function(item){
      	  return {
        		"c": [{
        			"v": moment(item.date).format('YYYY-MMM-D')
        		},
        		{
        			"v": item.love
        		},
        		{
        			"v": item.health
        		},
						{
        			"v": item.money
        		},
						{
        			"v": item.mood
        		}]
        	}
      	});
      	d.cols =  [{ label: "Days", type: "string"},
					{ label: "Love", type: "number"},
					{ label: "Health", type: "number"},
					{ label: "Money", type: "number"},
					{ label: "Mood", type: "number"}, ];
      	d.p = null;

        return d;
     }

			var climate = {};
			climate.options = {
				'is3D':true,
				fontSize: 14,
				colors : ['#FF0000', '#00ADEF', '#85bb65', 'yellow'],
				legend : {position: 'bottom'},
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
					ticks: [{v:-10, f:'Devastation'}, {v:-5, f:'Wind and rain'}, {v:0, f:'Not sunny Not raining'}, {v:5, f:'Spring impression'}, {v:10, f:'T shirt and bermuda'}],
					maxValue : 10,
					minValue : -10,
					textPosition : 'in',
				},
			};
			climate.type = 'LineChart';
			climate.data = convertToDataTable(climat);
			$scope.climate = climate;
}]);
