module.exports = function(grunt) {
	grunt.config.set('karma', {
        options: {
            configFile: 'karma.conf.js',
        },
        default: {
            browsers: ['PhantomJS'],
            singleRun: true,
        },
        all: {
            browsers: ['Chrome', 'Firefox', 'PhantomJS'],
            singleRun: true,
        }
	});
	grunt.loadNpmTasks('grunt-karma');
};
