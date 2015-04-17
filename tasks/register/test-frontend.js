module.exports = function (grunt) {
	grunt.registerTask('test-frontend', [
      'compileAssets',
      'karma:default'
	]);
};
