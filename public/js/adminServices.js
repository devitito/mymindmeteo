var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/api/admin/minds/:id', {id: '@id'}, {
      update: {method:'PUT'}
    });
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
	return ['guest', 'demo', 'mind', 'meteologist', 'validator', 'admin'];
}]);

adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/api/admin/records/recover', {}, {
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