
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var jade = require('jade');
var bodyParser = require('body-parser');
var express = require('express');

module.exports = function (app, models, io, operations) {
	//set template engine
	app.set('view engine', 'jade');

	//Set up middleware
	app.use(favicon(__dirname+'/..client/public/imgs/favicon.ico'));
	app.use
};