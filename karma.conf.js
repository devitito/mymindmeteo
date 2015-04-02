module.exports = function (config) {
  'use strict';
  var path = require('path');
  var basePath = path.dirname(path.dirname(__dirname));

  config.set({

    basePath: '',

    /* Files are now managed by environment definitions.
     * It's recommended to leave this empty. */
    files: [],

    /* Global frameworks here.
     * It's recommended to add further frameworks inside environments */
    frameworks: ['environments'],

    reporters: ['progress', 'brackets', 'coverage'],
    preprocessors: {
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'assets/js/**/!(*.spec).js': ['coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : 'assets/coverage/front',
      includeAllSources: true
    },

    environments: {
      /* Matcher for "Environment Definition Files" */
      definitions: ['assets/js/**/.karma.env.+(js|coffee)'],
      /* Matcher for test Files relative to definition files. */
      tests: ['*.spec.+(coffee|js)', 'test.*.+(js|coffee)'],
      /* Matcher for template files relative to definition files. */
      templates: ['*Fixture.html', 'template*.html'],
      /* Templates are wrapped with a div. Its class and id will use this prefix. */
      templateNamespace: 'ke',
      /* Timeout for asynchronous tasks. */
      asyncTimeout: 5000,
      /* Set true if environments should also be definable inside header comments of test files. */
      headerEnvironments: false,
      /* If you feel better with a delay between single environment runs, increase this value. */
      pauseBetweenRuns: 0,
      //customPaths: {
        //admin: path.join(basePath, 'assets/js/specs/administrator'),
       //mindmeteo: path.join(basePath, 'assets/js/specs/mindmeteo'),
        //welcome: path.join(basePath, 'assets/js/specs/welcome'),
        //modules: path.join(basePath, 'assets/js/specs/modules')
      //}
    },

    port: 9876,
    runnerPort: 9100,
    colors: true,
    autoWatch: true,
    // browsers: ['Chrome', 'Firefox', 'PhantomJS'],
    captureTimeout: 60000,
  });
};
