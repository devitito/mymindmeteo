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
      'moment/moment.js',
     // 'moment/moment-with-locales.js',
      'angular-moment/angular-moment.js',
      'angular-local-storage/dist/angular-local-storage.js'
    ], '../../../bower_components/')
    .add([
      'session.js',
      'flashMsg.js',
      'mind.js',
      'i18n.js',
      'timezone.js',
      'guest.js'
    ], '../../modules/')
    .add(['app.js'], '../../welcome/');;
};
