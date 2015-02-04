
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
	//Set views directory as a var for fs file checking
	var views = app.locals.settings.views;

	//Dashboard template
	var templates = express.Router();

	templates.route('/dashboard')
		.get(function(req, res, next) {
			res.render('templates/dashboard/home', {title:'home'});
			next();
		});

	templates.route('/dashboard/:template')
		.get(function(req, res, next) {
			var bool;
			fs.exists(views+'/templates/dashboard/'+req.params.template+'.jade',
				function (exists) {
					if(!exists) {
						res.statusCode = 404;
						res.render('404', {title:'404: File Not Found'});
						return next();
					}
					res.render('templates/dashboard/'+req.params.template, {title:req.params.template});
					return next();
				});
		});

	app.use('/templates', templates);

	//main views handler
	//IMPORTANT: because of the catchalls specific routes should be placed
	//above this line
	app.route('/')
		.get(function(req,res) {
			res.render('home', {title:'home'});
		});

	app.route('/:template')
		.get(function(req, res, next) {
			var bool; 
			fs.exists(views+'/'+req.params.template+'.jade',
				function (exists) {
					if(!exists) {
						console.log(exists);
						res.statusCode = 404;
						res.render('404', {title:'404: File Not Found'});
						return next();
					}
					res.render(req.params.template, {title:req.params.template});
					return next();
					
				});
		});

	//Load an API endpoint
	require('./views/api/')(app, models, io);

	//Set up 404
	app.route('/*')
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