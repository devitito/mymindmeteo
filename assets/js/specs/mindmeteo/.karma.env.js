module.exports = function(environment) {
  environment
    .use(['jasmine'])
    .add([
      'jquery/dist/jquery.js',
      'bootstrap/dist/js/bootstrap.js',
      'angular/angular.js',
      'angular-mocks/angular-mocks.js',
      'angular-route/angular-route.js',
      'angular-resource/angular-resource.js',
      'angular-bootstrap/ui-bootstrap.js',
      'angular-bootstrap/ui-bootstrap-tpls.js',
      'ng-table/ng-table.js',
      'angular-google-chart/ng-google-chart.js',
      'moment/moment.js',
      'angular-moment/angular-moment.js',
      'angular-local-storage/dist/angular-local-storage.js',
      'spin.js/spin.js',
      'angular-spinner/angular-spinner.js',
      'angular-snap/angular-snap.js',
      'ng-flow/dist/ng-flow-standalone.js'
    ], '../../../bower_components/')
    .add([
      'session.js',
      'dashboard.js',
      'flashMsg.js',
      'mind.js',
      'sensor.js',
      'report.js',
      'stats.js',
      'i18n.js',
      'timezone.js',
      'helper.js',
      'statement.js',
      'record.js',
      'emocicones.js',
      'climate.js',
      'helper.js',
      'profile.js'
    ], '../../modules/')
    .add(['app.js'], '../../mindmeteo/');
};
