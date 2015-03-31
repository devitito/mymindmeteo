/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
  //'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    'bower_components/perfect-scrollbar/css/perfect-scrollbar.css',
    'styles/**/*.css',
	'js/**/*.css',
    'assets/styles/importer.less'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

	//'bower_components/webcomponentsjs/webcomponents.min.js',

  // Dependencies like jQuery, or Angular are brought in here
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
	'bower_components/angular-route/angular-route.min.js',
	'bower_components/angular-resource/angular-resource.min.js',
	'bower_components/angular-bootstrap/ui-bootstrap.min.js',
	'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'bower_components/ng-table/ng-table.min.js',
	'bower_components/angular-google-chart/ng-google-chart.js',

	'bower_components/moment/min/moment-with-locales.min.js',
	'bower_components/angular-moment/angular-moment.min.js',
	//'bower_components/moment/locale/fr.js',
	//'bower_components/moment/locale/es.js',
	'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
	'bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'bower_components/spin.js/spin.js',
	'bower_components/angular-spinner/angular-spinner.js',
	'bower_components/snapjs/snap.js',
	'bower_components/angular-snap/angular-snap.js',
/*	'bower_components/perfect-scrollbar/js/min/perfect-scrollbar.js',
	'bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',*/
	'bower_components/ng-flow/dist/ng-flow-standalone.js',


	'js/app.js',
  'js/dependencies/**/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/!(*.spec).js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
