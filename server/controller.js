module.exports = function(app, models, io) {
	var operations = {};

	var operations.default = require('./operations/default/');

	operations.start = function () {
		operations.default.start();
	};

	return operations;
};