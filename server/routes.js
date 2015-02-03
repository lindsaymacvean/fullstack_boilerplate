
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
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	//set the client directory for client side views
	app.use('/', express.static(__dirname+'/../client/public/imgs/favicon.ico'));
	app.use('/public', express.static(__dirname+'/../client/public'));
	app.use('views', __dirname+'/../client/views');

	//main views handler
	app.route('/')
		.get(function(req,res) {
			res.render('home', {title:'home'});
		});

	app.route('/:template')
		.get(function(req, res) {
			res.render(req.params.template, {title:req.params.template});
		});

	//Load an API endpoint
	require('./views/api/')(app, models, io);
};