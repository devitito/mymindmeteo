module.exports = function (grunt) {
	grunt.registerTask('test-frontend-all', [
      'compileAssets',
      'karma:all'
	]);
};
