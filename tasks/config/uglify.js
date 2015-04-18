/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    dist_welcome: {
      src: ['.tmp/public/concat/production.welcome.js'],
      dest: '.tmp/public/min/production.welcome.min.js'
    },
    dist_meteo: {
      src: ['.tmp/public/concat/production.meteo.js'],
      dest: '.tmp/public/min/production.meteo.min.js'
    },
    dist_administrator: {
      src: ['.tmp/public/concat/production.administrator.js'],
      dest: '.tmp/public/min/production.administrator.min.js'
    }
  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
