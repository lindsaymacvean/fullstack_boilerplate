var express = require('express');
var mongoose = require('mongoose');
//config file for dev/production settings
var config = require('./config/');

//Set up App object etc.
var app = express();
var http = require('http').Server(app);
//Set up socket.io server & export as an app.publicMethod
var io = module.exports.io = require('socket.io')(http);
//Time Formatter exported so Jade an access
app.locals.moment = require('moment');

//Setup DB
mongoose.connect(config.mongoURL);
//On process end kill all DB connections
processon('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected');
		process.exit(0);
	});
});

//Set up models and export as public method
var models = module.exports.models = {};
models.Default = require('./models/default');


