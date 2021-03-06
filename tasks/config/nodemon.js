module.exports = function(grunt) {
	grunt.config.set('nodemon', {
        dev: {
            script: 'app.js',
            options: {
                env: {NODE_ENV: 'dev'},
                ignore: ['assets/bower_components/**', 'assets/coverage/**', '.git', 'README.md','.tmp/**', 'node_modules/**', 'test/**', 'resources/**', 'scripts/**', 'tasks/**', 'views/**'],
                watchedExtensions: ['js'],
            }
        },
        debug: {
            script: 'app.js',
            options: {
                env: {NODE_ENV: 'dev'},
                ignore: ['assets/bower_components/**', 'assets/coverage/**', '.git', 'README.md','.tmp/**', 'node_modules/**', 'test/**', 'resources/**', 'scripts/**', 'tasks/**', 'views/**'],
                watchedExtensions: ['js'],
                exec: 'node-theseus'
            },
        },
    });
	grunt.loadNpmTasks('grunt-nodemon');
};
