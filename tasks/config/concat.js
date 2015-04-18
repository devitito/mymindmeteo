/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

  grunt.config.set('concat', {
    js_welcome: {
      src: require('../pipeline').jsFilesToInjectInWelcome,
      dest: '.tmp/public/concat/production.welcome.js'
    },
    js_meteo: {
      src: require('../pipeline').jsFilesToInjectInMeteo,
      dest: '.tmp/public/concat/production.meteo.js'
    },
    js_administrator: {
      src: require('../pipeline').jsFilesToInjectInAdministrator,
      dest: '.tmp/public/concat/production.administrator.js'
    },
    css: {
      src: require('../pipeline').cssFilesToInject,
      dest: '.tmp/public/concat/production.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
