module.exports = function(grunt) {
	grunt.config.set('mocha_istanbul', {
		coverage: {
			src: 'test', // the folder, not the files
			options: {
				coverageFolder: 'assets/coverage/back',
				mask: '**/*.test.js',
				root: 'api',
				excludes: ['responses/*']
			}
		}
	});
	grunt.loadNpmTasks('grunt-mocha-istanbul');
};
