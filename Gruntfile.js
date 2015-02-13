'use strict';

module.exports = function(grunt) {
	
	//Just in time loader for all grunt packages
	require('jit-grunt')(grunt, {
		express: 'grunt-express-server'
	});

	//Benchmark Grunt compile
	require('time-grunt')(grunt);


	//configure Grunt
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		//Run the app in dev mode using Grunt
		express: {
			options: {
				port: process.env.PORT || 9000
			},
			dev: {
				options: {
					script: 'server/app.js',
					debug:true
				}
			}
		},

		//Open a webpage to the main view
		open: {
			server: {
				url: 'http://localhost:'+(process.env.PORT || 9000)
			}
		},

		//Watch for file changes and either reload the view or the server
		watch: {
			livereload: {
				files: [
					'client/**/**'
				],
				options: {
					livereload: true
				}
			},
			express: {
				files: [
					'server/**/**'
				],
				tasks: ['express:dev', 'wait'],
				options: {
					livereload: true,
					nospawn: true //stops from spawning as a child process
				}
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

	//Delay live reload until after server has restarted
	grunt.registerTask('wait', function () {
		grunt.log.ok('Waiting for the server reload...');
		//force this task into async mode so other things can happen
		var done = this.async();
		setTimeout(function () {
			grunt.log.writeln('Done waiting!');
			done();
		}, 200);
	});

	grunt.registerTask('server', function () {
		grunt.task.run([
			'express:dev',
			'wait',
			'open',
			'watch'
			]);
	});

};