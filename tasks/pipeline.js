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
    'bower_components/perfect-scrollbar/css/perfect-scrollbar.css',
    'styles/**/*.css',
    'styles/importer.less'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInjectInWelcome = [
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',
  'js/dependencies/**/*.js',

  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-resource/angular-resource.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower_components/moment/min/moment-with-locales.min.js',
  'bower_components/angular-moment/angular-moment.min.js',
  'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
  'bower_components/underscore/underscore.js',
  'js/welcome/app.js',
  'js/modules/guest.js',
  'js/modules/mind.js',
  'js/modules/i18n.js',
  'js/modules/timezone.js',
  'js/modules/session.js',
  'js/modules/flashMsg.js',
  'js/modules/underscore.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  //'js/**/!(*.spec).js'
];

var jsFilesToInjectInMeteo = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',
  'js/dependencies/**/*.js',

  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-route/angular-route.min.js',
  'bower_components/angular-resource/angular-resource.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap.min.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower_components/moment/min/moment-with-locales.min.js',
  'bower_components/angular-moment/angular-moment.min.js',
  'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
  'bower_components/ng-table/ng-table.min.js',
  'bower_components/angular-google-chart/ng-google-chart.js',
  'bower_components/spin.js/spin.js',
  'bower_components/angular-spinner/angular-spinner.js',
  'bower_components/underscore/underscore.js',
  'bower_components/ng-flow/dist/ng-flow-standalone.js',
  'js/mindmeteo/app.js',
  'js/modules/session.js',
  'js/modules/dashboard.js',
  'js/modules/flashMsg.js',
  'js/modules/mind.js',
  'js/modules/sensor.js',
  'js/modules/report.js',
  'js/modules/record.js',
  'js/modules/stats.js',
  'js/modules/i18n.js',
  'js/modules/timezone.js',
  'js/modules/climate.js',
  'js/modules/emocicones.js',
  'js/modules/statement.js',
  'js/modules/helper.js',
  'js/modules/profile.js',
  'js/modules/underscore.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  //'js/**/!(*.spec).js'
];

var jsFilesToInjectInAdministrator = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

	//'js/app.js',
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
var templateFilesToInjectInWelcome = [
  'templates/welcome/**/*.html'
];

var templateFilesToInjectInMeteo = [
  'templates/mindmeteo/**/*.html'
];

var templateFilesToInjectInAdministrator = [
  'templates/administrator/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInjectInWelcome = jsFilesToInjectInWelcome.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInjectInMeteo = jsFilesToInjectInMeteo.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInjectInAdministrator= jsFilesToInjectInAdministrator.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInjectInWelcome = templateFilesToInjectInWelcome.map(function(path) {
  return 'assets/' + path;
});
module.exports.templateFilesToInjectInMeteo = templateFilesToInjectInMeteo.map(function(path) {
  return 'assets/' + path;
});
module.exports.templateFilesToInjectInAdministrator = templateFilesToInjectInAdministrator.map(function(path) {
  return 'assets/' + path;
});
