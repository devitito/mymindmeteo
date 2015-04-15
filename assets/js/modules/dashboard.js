

angular.module('dashboard', ['ngResource', 'session', 'stats', 'climate', 'googlechart', 'helper', 'angularSpinner', 'report', 'emocicones', 'ui.bootstrap', 'snap'])
  .controller('dashboardCtrl', ['$scope', 'recovery', 'identity',
    function ($scope, recovery, identity) {
      $scope.recover = function () {
        $scope.result = '  In progress. Wait...';
        recovery.query(
          function(data){
            $scope.result = '  Indexes re-created on : ' + moment().locale(identity.locale).format('lll');
          },
          function(error) {
            try {
              $scope.result = '  ' + error.data.message;
            } catch (e) {
              $scope.result = '  An error occured while re indexing the records';
            }
          });
      }
}])
.controller('adminNavBarCtrl', ['$scope', '$window', 'identityService', 'sessionFactory',
  function ($scope, $window, identityService, sessionFactory) {
		/*$scope.go = function (url) {
			$location.path(url);
		};
*/
		identityService.get()
		.then(function(identity) {
			$scope.identity = identity;
		});

		$scope.logout = function () {
			sessionFactory.destroy()
			.then(function(success) {
              $window.location.href = '/';
			})
			.catch(function(error) {
				//todo display error
			});
		}
}])
.controller('mindDashboardCtrl', ['$scope', '$location', '$timeout', '$window', 'identity', 'sessionFactory', 'statsFactory', 'climateChartHelper', 'tableHelper', 'usSpinnerService', 'reportCategories', 'emociconeService', 'reportRanges', 'snapRemote',
    function ($scope, $location, $timeout, $window, identity, sessionFactory, statsFactory, climateChartHelper, tableHelper, usSpinnerService, reportCategories, emociconeService, reportRanges, snapRemote) {
			$scope.go = function (url) {
				$location.path(url);
			};

			statsFactory.climate(identity.name)
			.then(function (climate) {
				climateChartHelper.load($scope, climate);
				//wait a bit for the graph to display on slow device
				$timeout(function() {
					usSpinnerService.stop('spinner');
					$scope.spinneroff = true;
				}, 1000);
			})
			.catch(function (error) {
				$scope.showError(error);
			});

			$scope.identity = identity;

			$scope.logout = function () {
				sessionFactory.destroy()
				.then(function(success) {
					$window.location.href = '/';
				})
				.catch(function(error) {
					//todo display error
				});
			};

			$scope.ViewStatement = function(statement) {
				statement.notread = false;
				//$scope.editedStatement = statement;
              $scope.go('/statement/view/'+statement.id);
			};

			$scope.sendStatement = function() {
				$scope.editedStatement = undefined;
				$scope.sentConfirm = 'Message sent successfully!';
				$timeout(function () {
					$scope.sentConfirm = undefined;
				}, 3000);
			};

			$scope.close = function() {
				$scope.editedStatement = undefined;
			};

			$scope.showError = function (error) {
				$scope.processing = false;
				$scope.error = error;
				$timeout(function() {
					$scope.error = undefined;
				}, 5000);
			};

			$scope.record = function () {
				snapRemote.close();
				$location.path('climate/record');
				//recordsFactory.launch($scope);
			};

			$scope.generate = function () {
				snapRemote.close();
				$location.path('statement/new');
			};

			$scope.openReportList = function () {
				$scope.show = 'reports';
				$scope.newReports = false;
			};

			$scope.openClimate = function () {
				$scope.show = 'climate';
			};

			$scope.tableParams = tableHelper.new('statements-list', {id:$scope.identity.id});

			$scope.show = 'climate';
			$scope.processing = false;
			$scope.spinneroff = false;

			$scope.getImgByCategory = function (category) {
				var img = reportCategories.img(category);
				console.log(img);
				return img;
				//return reportCategories.img(category);
			};

			$scope.getCategoryLabel = function(category) {
				var label = reportCategories.label(category);
				console.log(label);
				return 'Category: ' + label;
			};

			$scope.getEmocicone = function (range) {
				var img = emociconeService.range2img(range);
				console.log(img);
				return img;
			};

			$scope.getMoodRangeLabel = function(range) {
				var label = reportRanges.label(range);
				console.log(label);
				return 'Mood: ' + label;
			}

			//snapRemote.enable();
			/*snapRemote.getSnapper().then(function(snapper) {
				snapper.on('open', function() {
					log('Drawer opened!');
				});

				snapper.on('close', function() {
					log('Drawer closed!');
				});
  		});*/
}])
.factory('recovery', ['$resource',
  function($resource){
    return $resource('/admin/resetIndices', {}, {
      query: {method:'GET', isArray:false}
    });
}]);
