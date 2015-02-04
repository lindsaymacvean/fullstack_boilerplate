var express = require('express');
var mongoose = require('mongoose');
//config file for dev/production settings
var config = require('./config/');

//Set up App object etc.
var app = express();
var http = require('http').Server(app);
//Set up socket.io server & export as an app.publicMethod
var io = module.exports.io = require('socket.io')(http);
//Time Formatter exported so Jade can access
app.locals.moment = require('moment');

//Setup DB
mongoose.connect(config.mongoURL);
//On process end kill all DB connections
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected');
		process.exit(0);
	});
});

//Set up models and export as public method
var models = module.exports.models = {};
models.Default = require('./models/default');

//Setup Operations
var operations = require('./controller')(app, models, io);

//Set up routes
var routes = require('./routes')(app, models, io, operations);

//Fire it up
var port = process.env.PORT || config.port;

http.listen(port, function() {
	console.log('Started on port '+port);
	//Start any operations that need to wait for the server to start
	//operations.start();
});