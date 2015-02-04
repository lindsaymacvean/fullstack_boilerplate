module.exports = function(grunt) {
	
	//configure Grunt
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		//configure nodemon to start our server
		nodemon: {
			dev: {
				script:'server/app.js'
			}
		},

		bowercopy: {
			options: {
				srcPrefix:'bower_components'
			},
			scripts: {
				options: {
					destPrefix: 'client/public/js'
				},
				files: {
					'jquery.js': 'jquery/dist/jquery.js',
					'socket.io.js': 'socket.io-client/socket.io.js',
					'jquery.validate.js': 'jquery-validation/dist/jquery.validate.js',
					'moment.js': 'moment/moment.js'	
				}
			}
		}

	});

	//load Grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//Register Task pointers for Grunt command
	//grunt.registerTask('default', ['nodemon']);
};