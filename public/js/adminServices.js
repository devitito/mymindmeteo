var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/api/admin/minds/:id', {id: '@id'}, {
      update: {method:'PUT'}
    });
}]);

adminServices.factory('identityService', ['$resource', function($resource){
	//todo check changes + localstorage
	return $resource('/api/admin/identity', {}, {
	      get: {method:'GET', isArray:false}
	    });
	//return $http.get('/api/admin/identity', {cache: false});
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