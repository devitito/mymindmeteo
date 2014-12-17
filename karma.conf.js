module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '.',
        files: [
					//	'assets/bower_components/angular/angular.js',
					//	'assets/bower_components/angular-mocks/angular-mocks.js',
					'assets/js/dependencies/sails.io.js',
					'assets/bower_components/jquery/dist/jquery.js',
					'assets/bower_components/bootstrap/dist/js/bootstrap.js',
					'assets/bower_components/angular/angular.js',
					'assets/bower_components/angular-mocks/angular-mocks.js',
					'assets/bower_components/angular-route/angular-route.js',
					'assets/bower_components/angular-resource/angular-resource.js',
					'assets/bower_components/angular-bootstrap/ui-bootstrap.js',
					'assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
					'assets/bower_components/ng-table/ng-table.js',
					'assets/bower_components/angular-google-chart/ng-google-chart.js',
					'assets/bower_components/moment/moment.js',
					'assets/bower_components/angular-moment/angular-moment.js',
				//	'assets/bower_components/moment/locale/fr.js',
				//	'assets/bower_components/moment/locale/es.js',

					'assets/js/admin/app.js',
					'assets/js/admin/app.spec.js',
					'assets/js/admin/adminServices.js',
					'assets/js/admin/Services/identity.js',
					'assets/js/admin/Services/lang.js',
					'assets/js/admin/Services/flash.js',
					'assets/js/admin/Services/stats.js',
					'assets/js/admin/Services/cache.js',
					'assets/js/admin/adminController.js',
					'assets/js/admin/adminDirectives.js',
					'assets/js/admin/Controller/Mind/EditController.js',
					'assets/js/admin/Controller/Mind/EditController.spec.js'
				],
        reporters: ['progress', 'brackets'],
        frameworks: ['jasmine'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox'],
        captureTimeout: 60000,
        singleRun: false
    });
};
