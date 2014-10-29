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

adminDirectives.directive('equalsTo', [function () {
    /*
     * <input type="password" ng-model="Password" />
     * <input type="password" ng-model="ConfirmPassword" equals-to="Password" />
     */
    return {
        restrict: 'A', // S'utilise uniquement en tant qu'attribut
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var check = function () {
                //Valeur du champs courant
                var v1 = scope.$eval(attrs.ngModel); // attrs.ngModel = "confirmedpassword"
 
                //valeur du champ à comparer
                var v2 = scope.$eval(attrs.equalsTo).$viewValue; // attrs.equalsTo = "Password"
                return v1 == v2;
            };
            scope.$watch(check, function (isValid) {
                // Défini si le champ est valide
                control.$setValidity("equalsTo", isValid);
            });
        }
    };
}]);