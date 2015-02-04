
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var jade = require('jade');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

module.exports = function(app, models, io, operations) {
	//set template engine
	app.set('view engine', 'jade');

	//Set up middleware
	app.use(favicon(__dirname+'/../client/public/imgs/favicon.ico'));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	//set the client directory for client side views
	app.use('/', express.static(__dirname+'/../client/views'));
	app.use('/public', express.static(__dirname+'/../client/public'));
	app.set('views', __dirname+'/../client/views');
	var views = app.locals.settings.views;
	
	//main views handler
	app.route('/')
		.get(function(req,res) {
			res.render('home', {title:'home'});
		});

	app.route('/:template')
		.get(function(req, res, next) {
			var bool; 
			fs.exists('/views/'+req.params.template,
				function (exists) {
					if(!exists) {
						app.render(req.params.template, {title:req.params.template});
						return next();
					}
					res.statusCode = 404;
					res.render('404', {title:'404: File Not Found'});
				});
		});

	//Dashboard template
	app.route('/template/')
		.get(function(req, res) {
			res.render('/template/home', {title:req.params.template});
		});

	app.route('/template/:template')
		.get(function(req, res, next) {
			var bool; 
			fs.exists(views+'/../template/'+req.params.template,
				function (exists) {
					console.log(views+'/../template/'+req.params.template);
					console.log(exists);
					if(!exists) {
						res.render('/template/'+req.params.template, {title:req.params.template});
						return next();e
					}
					res.statusCode = 404;
					res.render('404', {title:'404: File Not Found'});
					return next();
				});
		});

	//Load an API endpoint
	require('./views/api/')(app, models, io);

	//Set up 404
	app.route('*')
		.get(function (req, res, next) {
			var err = new Error();
			err.status = 404;
			next(err);
		});

	app.use(function (err, req, res, next) {
		if(err.status === 404) {
			url = req.url;
			res.render('404', 
				{
					title:'404: File Not Found',
					url: url
			});
		}
	});

};