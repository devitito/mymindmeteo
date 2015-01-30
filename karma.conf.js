module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '.',
        files: [
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
					'assets/bower_components/angular-local-storage/dist/angular-local-storage.js',
					'assets/bower_components/angular-ui-router/release/angular-ui-router.min.js',

					'assets/js/app.js',
					'assets/js/Services/**/*.js',
					'assets/js/Directives/**/*.js',
					'assets/js/admin/**/*.js',
					'assets/js/guest/**/*.js',
					'assets/js/mind/**/*.js',
					'assets/js/specs/**/*.js',
				],
        reporters: ['progress', 'brackets', 'coverage'],

				preprocessors: {
					// do not include tests or libraries
					// (these files will be instrumented by Istanbul)
					'assets/js/**/!(*.spec).js': ['coverage']
				},

				coverageReporter: {
					type : 'html',
					dir : 'assets/coverage/front'
				},

        frameworks: ['jasmine'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};
