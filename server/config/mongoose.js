'use strict';
var mongoose = require('mongoose');

module.exports = function () {
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
	//COULD TRY MAKING THIS AUTOMATIC TO GRAB EVERYTHING IN THE DIRECTORY
	var models = {};
	models.Default = require('../models/default');

	return models;
};