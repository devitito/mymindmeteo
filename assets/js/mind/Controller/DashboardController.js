/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', 'identity', 'flash', 'sessionFactory', 'climat',
    function ($scope, $location, identity, flash, sessionFactory, climat) {
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

/*				graph.options = {
				'is3D':true,
				fontSize: 14,
				colors : ['#FF0000', '#00ADEF', '#85bb65', 'yellow'],
				legend : {position: 'none'},
				'hAxis': {format: 'dd/MM/yyyy'}
			};
			*/

			var convertToDataTable = function (json){
      	var d= {};
      	d.rows = json.map(function(item){
      	  return {
        		"c": [{
        			"v":new Date(item.date)
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
      	d.cols =  [{ label: "Days", type: "date"},
					{ label: "Love", type: "number"},
					{ label: "Health", type: "number"},
					{ label: "Money", type: "number"},
					{ label: "Mood", type: "number"}, ];
      	d.p = null;

        return d;
     }

			var climate = {};
			climate.type = 'LineChart';
			climate.data = convertToDataTable(climat);


			$scope.climate = climate;
}]);
