var adminDirectives = angular.module('adminDirectives', []);

adminDirectives.directive('ngUnique', ['$http', function ($http) {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			elem.on('blur', function (evt) {
				scope.$apply(function () {
					var val = elem.val();
					var field = attrs.ngUnique;
					var ajaxConfiguration = { method: 'POST', url: '/api/validate-mind-'+field, data: elem.serialize(), headers: {'Content-Type': 'application/x-www-form-urlencoded'} };
					$http(ajaxConfiguration)
						.success(function(data, status, headers, config) {
							ctrl.$setValidity('unique', angular.fromJson(data).valid);
						});
				});
			});
		}
	}
}
]);