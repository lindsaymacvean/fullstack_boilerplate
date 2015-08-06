module.exports = function(app, models, io) {
	var operations = {};

	operations.main = require('./operations/default/');

	operations.start = function () {
		operations.main.start();
	};

	return operations;
};