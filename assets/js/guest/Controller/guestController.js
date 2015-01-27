

var homepageCtrl = adminControllers.controller('homepageCtrl', ['$scope', '$sce', '$location',
    function ($scope, $sce, $location) {
	//			$scope.partial.navbar-logged-out.htmlSafe = $sce.trustAsHtml(preview_data.preview.embed.html);
			$scope.go = function (url) {
				$location.path(url);
			};
}]);

