'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

module.exports = function (app) {
	var env = app.get('env');

	//Set up middleware
	app.use(favicon(__dirname+'/../../client/public/imgs/favicon.ico'));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	if('development'===env) {
		app.use(require('connect-livereload')());
		app.use(errorHandler()); //Error Handler has to be last
	}
};