

angular.module('i18n', [])
.factory('lang', ['$http',
    function($http){
	//$scope.langs = ['fr', 'en'];
	/*$http.get('/js/rsc/lang.json').success(function(data) {
		$scope.langs = data;
    }); */
	return {
		list: function(locale) {
			if (angular.isUndefined(locale)) locale = 'en_EN';

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
