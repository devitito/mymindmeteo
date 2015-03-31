module.exports = function (grunt) {
	grunt.registerTask('test-backend', [
		'mocha_istanbul'
	]);
};
