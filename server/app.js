'use strict';

var express = require('express');
var mongoose = require('mongoose');
//config file for dev/production settings
var config = require('./config/environment');

//Set up App object etc.
var app = express();
var http = require('http').Server(app);
//Set up socket.io server & export as an app.publicMethod
var io = require('socket.io')(http);
//Time Formatter exported so Jade can access
app.locals.moment = require('moment');

//Set up database using mongoose
var models = require('./config/mongoose');

//Setup Operations (formerly controllers)
var operations = require('./controller')(app, models, io);

//Set up Routes (views & api)
var routes = require('./routes')(app, models, io, operations);

//Fire it up
var port = process.env.PORT || config.port;

http.listen(port, function() {
	console.log('Started on port '+port);
	//Start any operations that need to wait for the server to start
	//operations.start();
});