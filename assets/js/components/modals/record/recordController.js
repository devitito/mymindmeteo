mindControllers.controller('RecordModalCtrl', function ($scope, $modalInstance) {
  $scope.close = function () {
    $modalInstance.close();
  };

  $scope.puhlease = function () {
    $modalInstance.dismiss();
  };
});
