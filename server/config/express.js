'use strict';

var express = require('express');
var favicon = require('serve-favicon');
//For parsing standard json requests to an API endpoint
//populates the req.body object with content
//http://www.senchalabs.org/connect/bodyParser.html
//http://expressjs.com/api.html#req.body
var bodyParser = require('body-parser');
//For handling PUT and DELETE requests over POST
//app.put() or app.delete() instead of app.post(etc)
//http://www.senchalabs.org/connect/methodOverride.html
var methodOverride = require('method-override');

module.exports = function (app) {
	var env = app.get('env');

	//Set up middleware
	app.use(favicon(__dirname+'/../../client/public/imgs/favicon.ico'));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	if('development'===env) {
		//Logging tools
		var winston = require('winston');
		winston.emitErrs = true;
		var logger = new winston.Logger({
			transports: [
				new winston.transports.File({
		            level: 'info',
		            filename: './server/all-logs.log',
		            handleExceptions: true,
		            json: true,
		            maxsize: 5242880, //5MB
		            maxFiles: 5,
		            colorize: false
		        }),	
		        //*/
				new winston.transports.Console({
					level:'debug',
					//handleExceptions: true,
					json:false,
					colorize:true
				}),
			],
			exitOnError:false
		});
		logger.stream = { 
			write: function (message, encoding) {
				logger.info(message);
			}
		};
		var morgan = require('morgan');
		app.use(morgan({'stream': logger.stream}));
		//Live reload inject client script
		app.use(require('connect-livereload')());
		var errorHandler = require('errorhandler');
		app.use(errorHandler()); //Error Handler has to be last
		
	}
};