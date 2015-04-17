module.exports = function (grunt) {
	grunt.registerTask('test', [
      'compileAssets',
      'karma:default',
      'mocha_istanbul'
	]);
};
