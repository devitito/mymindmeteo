/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindControllers.controller('mindProfileEditCtrl', [
	'$scope',
	'$location',
	'$timeout',
	'$rootScope',
	'identity',
	'mindFactory',
  function ($scope, $location, $timeout, $rootScope, identity, mindFactory) {
		$scope.saved = false;

		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.identity = identity;

		$scope.saveImage = function(flow) {
			$scope.saved = false;
			if(flow){
				var abc = !!{png:1,gif:1,jpg:1,jpeg:1}[flow.files[0].getExtension()]
				if(abc == true){
					var fileReader = getFileReader( $scope ),
							file = flow.files[0].file;

					fileReader.readAsDataURL(file);
					$scope.$apply();
				}else{
					flow.cancel()
				}
			}
		};

		var getFileReader = function( $scope ) {
			var fileReader = new FileReader();
			fileReader.onloadend = function() {
        $scope.img = fileReader.result;
			};
    	return fileReader;
		};

		$scope.save = function () {
			if ($scope.img == undefined) {
				$scope.saved = true;
				//location.path('/mind/dashboard/'+$scope.identity.name);
				return;
			}

			//resize
			var image = new Image();
			image.onload = function() {

				var canvas = document.createElement('canvas');
				canvas.width = 90;
				canvas.height = 90;

				var ctx = canvas.getContext("2d");
				ctx.drawImage(image, 0, 0, 90, 90);
				var dataURL = canvas.toDataURL();

				mindFactory.get({id:$scope.identity.id}).$promise
				.then(function(mind) {
					mind.picture = dataURL;
					return mind.$update();
				})
				.then(function (updatedMind) {
					$scope.identity.picture = dataURL;
					$rootScope.$broadcast('mind.post.edit', $scope.identity);
					$scope.saved = true;
					//location.path('/mind/dashboard/'+$scope.identity.name);
				});
			};
			image.src = $scope.img;
		}
}]);