

angular.module('climate', ['emocicones', 'session', 'record'])
.controller('mindClimateRecordCtrl', [
  '$scope',
  '$location',
  '$timeout',
  'identity',
  'sessionFactory',
  'sensorList',
  'recordsFactory',
  'moment',
  function ($scope, $location, $timeout, identity, sessionFactory, sensorList, recordsFactory, moment) {
		$scope.processing = false;

		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.identity = identity;

		$scope.showError = function (error) {
			$scope.processing = false;
			$scope.error = error;
			$timeout(function() {
				$scope.error = undefined;
				$location.path('dashboard/'+$scope.identity.name);
			}, 5000);
		};

		$scope.close = function () {
			if ($scope.records.length) {
				$scope.processing = true;

				recordsFactory.save({id:$scope.identity.id}, $scope.records)
				.then(function (success) {
					$location.path('dashboard/'+$scope.identity.name);
				})
				.catch(function (err) {
					$scope.showError(err.data);
				});
			}
			else
				$location.path('dashboard/'+$scope.identity.name);
  	};

		/**
		 * Return the index in sensorList for the next sensor
		 * Return -1 if all the index have been used (=all questions have been asked)
		 */
		var getNextRandomSensorIndex = function() {
			var index = -1;

			if (indexlist.length == sensorList.length)
				return -1;

			while (index == -1 || indexlist.indexOf(index) != -1) {
				index = randomIntFromInterval(0, sensorList.length-1);
			};

			indexlist.push(index);
			return index;
		};

		$scope.puhlease = function () {
			//skype this test
			sensorIndex = getNextRandomSensorIndex();
			console.log(sensorIndex);
			if (sensorIndex == -1)
				$scope.end = true;
			else
				$scope.sensor = sensorList[sensorIndex]._source;
		};

    $scope.record = function (sensorId, sample) {
      $scope.records.push({mind_id: identity.id, sensor_id: sensorId, sample_id: sample.id});
      $scope.puhlease();
    };

    var indexlist = [];
    var sensorIndex = getNextRandomSensorIndex();
    $scope.end = false;
    $scope.records = [];
    $scope.sensor = sensorList[sensorIndex]._source;
}])
.factory("climateChartHelper", ['emociconeService', '$window', function(emociconeService, $window) {
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

        var lineWidth, pointSize;
        if ($window.innerWidth > 629) {
          pointSize = 6;
          lineWidth = 3;
        }
        else {
          pointSize = 3;
          lineWidth = 2;
        }

        climate.options = {
          'is3D':true,
          fontSize: 14,
          colors : [/*'#FF0000',*/ '#00ADEF'/*, '#85bb65', 'yellow'*/],
          legend : {position: 'none'},
          chartarea: {left:0,top:0,width:'100%',height:'100%'},
          pointSize : pointSize,
          lineWidth: lineWidth,
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
            textStyle: { fontSize: 16, bold: true, color: '#808080'},
            maxValue : 10,
            minValue : -10,
            //textPosition : 'in',
            gridlines: { color : 'transparent'},
            //baselineColor: 'transparent'
          },
        };
        climate.type = 'LineChart';
        climate.data = convertToDataTable(climat.data, $scope);
        $scope.climate = climate;

        $scope.total = climat.info.total;
        $scope.sunny = climat.info.sunny;
        $scope.rainy = climat.info.rainy;
        $scope.message = undefined;
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
    $scope.emocicone = {};
	$scope.emocicone.love = emociconeService.eval(newestItem.love);
	$scope.emocicone.health = emociconeService.eval(newestItem.health);
	$scope.emocicone.money = emociconeService.eval(newestItem.money);

	return d;
};

  return factory;
}]);

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}
