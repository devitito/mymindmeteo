var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/api/admin/minds/:id', {id: '@id'}, {
      update: {method:'PUT'}
    });
}]);

adminServices.factory('sensorFactory', ['$resource', function($resource){
	return $resource('/api/admin/sensors/:id', {id: '@id'}, {
		query: {method:'GET', isArray:false},
		update: {method:'PUT'},
		suggest: {method:'SUGGEST', isArray:true}
	});
}]);

adminServices.factory('statsFactory', ['$resource', function($resource){
	var factory = {};
	
	factory.query = function (deferred) {
		$resource('/api/admin/stats/:graph', {}, {
			query: {method:'GET', isArray:false}
		}).query(
			function(data){
    			deferred.resolve(data); 
    		}, function(errorData) {
    			deferred.resolve('An error occured while retreiving the stats');
    		});
		return deferred.promise;
	};
	
	factory.getType = function(stat) {
		switch (stat) {
			case 'sensorPerTopic':
				return 'PieChart';
				break;
			
			case 'testPerDay':
			case 'testPerHour':
				return 'ColumnChart';
				break;
				
			default:
				break;
		};
	}
	
	factory.getOptions = function(stat) {
		switch (stat) {
			case 'sensorPerTopic':
				return {
			        'title': 'Sensor per topic',
			        'is3D':true,
			        colors: ['#FF0000', '#00ADEF', '#85bb65'],
			        fontSize: 14,
			    };
				break;
			
			case 'testPerDay':
				return {
			        'title': 'Number of test completed per day of the week',
			        'is3D':true,
			        fontSize: 14,
			        colors : ['#00ADEF'],
			        legend : {position: 'none'}
			    };
				break;
				
			case 'testPerHour':
				return {
			        'title': 'Most popular hours of the day to complete test',
			        'is3D':true,
			        fontSize: 14,
			        colors : ['#00ADEF'],
			        legend : {position: 'none'}
			    };
				break;
				
			default:
				break;
		};
	}
	
	populateRows = function (data)
	{
		var rows = [];
		angular.forEach(data, function(value, key) {
			rows.push({c: [{v: key}, {v: value}]});
		});
		return rows;
	};
	
	populateCols = function (stat) 
	{
		switch (stat) {
			case 'sensorPerTopic':
				return [
				      {id: "t", label: "Topic", type: "string"},
				      {id: "s", label: "Sensors", type: "number"}
					];
				break;
		
			case 'testPerDay':
				return [
				      {id: "d", label: "Days", type: "string"},
				      {id: "c", label: "Test completed", type: "number"}
					];
				break;
				
			case 'testPerHour':
				return [
				      {id: "h", label: "Hour", type: "string"},
				      {id: "c", label: "Test completed", type: "number"}
					];
				break;
				
			default:
				break;
		}
	}
		
	factory.populate = function(stat, data) {
		return { "cols": populateCols(stat), "rows": populateRows(data)};
	};
	
	return factory;
}]);

adminServices.factory('identityService', ['$resource', '$cacheFactory', '$rootScope', function($resource, $cacheFactory, $rootScope){
	var factory = {};
	var cache = $cacheFactory('identity');
	
	$rootScope.$on("mind.post.edit", function(event, args) {
		//Remove current identity from cache if it was modified
		if (args.id == factory.getId()) {
			cache.removeAll();
		}
	});
	
	factory.getId = function () {
		if (cache.info().size == 0)
			return null;
		
		return cache.get('id');
	};
	
	factory.get = function (deferred) {
		if (cache.info().size == 0) {
			//nothing cached yet
			$resource('/api/admin/identity').get(
			    function(data){
					factory.set(data);
    				deferred.resolve(data); 
    			}, function(errorData) {
    				deferred.resolve('An error occured while retreiving the identity');
    			});
		}
		else {
			var identity = [];
			identity.id = cache.get('id');
			identity.email = cache.get('email');
			identity.joindate = cache.get('joindate');
			identity.locale_joindate = cache.get('locale_joindate');
			identity.locale = cache.get('locale');
			identity.name = cache.get('name');
			identity.role = cache.get('role');
			identity.timezone = cache.get('timezone');
			deferred.resolve(identity);
		}
		return deferred.promise;
	};

	factory.set = function(data) {
		cache.put('id', data.id);
		cache.put('email', data.email);
		cache.put('joindate', data.joindate);
		cache.put('locale_joindate', data.locale_joindate);
		cache.put('locale', data.locale);
		cache.put('name', data.name);
		cache.put('role', data.role);
		cache.put('timezone', data.timezone);
	};
	
	factory.isSelf = function (id) {
		if (id == factory.getId()) 
			return true;
		else 
			return false;
	};
	
	return factory;
}]);

adminServices.factory('roles', [function(){
		return [{code:'guest', name:'Guest'},
		        {code:'demo', name:'Demo'},
		        {code:'mind', name:'Mind'},
		        {code:'meteologist', name:'Meteologist'},
		        {code:'validator', name:'Validator'},
		        {code:'admin', name:'Administrator'}];
}]);

adminServices.factory('sensorStatus', [function(){
	return [{code:'unapproved', name:'Unapproved'},
	        {code:'approved', name:'Approved'},
	        {code:'assigned', name:'Assigned'}];
}]);

adminServices.factory('timezones', [function(){
	return ['Europe/Paris', 'Europe/London'];
}]);

adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/api/admin/indexes/recreate', {}, {
      query: {method:'GET', isArray:true}
    });
}]);

adminServices.factory('lang', ['$http',
    function($http){
	//$scope.langs = ['fr', 'en'];
	/*$http.get('/js/rsc/lang.json').success(function(data) {
		$scope.langs = data;
    }); */   
	return {
		list: function(locale) {
			if (locale == 'fr_FR')
				return [{code:'fr_FR', name:'Français'},
				        {code:'en_EN', name:'Anglais'},
				        {code:'es_ES', name:'Espagnol'}];
			if (locale == 'en_EN')
				return [{code:'fr_FR', name:'French'},
				        {code:'en_EN', name:'English'},
				        {code:'es_ES', name:'Spanish'}];
			if (locale == 'es_ES')
				return [{code:'fr_FR', name:'Francès'},
				        {code:'en_EN', name:'Inglès'},
				        {code:'es_ES', name:'Castellano'}];
		},
		locale2lang: function(locale, lang) {
			if (locale == 'fr_FR') {
				if (lang == 'fr_FR') return 'Français';
				if (lang == 'en_EN') return 'French';
				if (lang == 'es_ES') return 'Francès';
			}
			if (locale == 'en_EN') {
				if (lang == 'fr_FR') return 'Anglais';
				if (lang == 'en_EN') return 'English';
				if (lang == 'es_ES') return 'Inglès';
			}
			if (locale == 'es_ES') {
				if (lang == 'fr_FR') return 'Espagnol';
				if (lang == 'en_EN') return 'Spanish';
				if (lang == 'es_ES') return 'Castellano';
			}
		}
	};
}]);



adminServices.factory("flash", function($rootScope) {
	  var queue = [];
	  var currentMessage = "";

	  $rootScope.$on("$routeChangeSuccess", function() {
	    currentMessage = queue.shift() || "";
	  });

	  return {
		  setMessage: function(message) {
			  queue.push(message);
		  },
		  getMessage: function() {
			  return currentMessage;
		  }
	  };
});