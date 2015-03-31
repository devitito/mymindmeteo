module.exports = function (grunt) {
	grunt.registerTask('test', [
		'karma:default',
        'mocha_istanbul'
	]);
};
