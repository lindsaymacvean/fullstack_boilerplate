'use strict';

var jade = require('jade');
var express = require('express');
var fs = require('fs');

module.exports = function(app, models, io, operations) {
	//set template engine
	app.set('view engine', 'jade');

	//Set up middleware
	require('./config/express')(app);

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
			var template = req.params.template.toLowerCase()
			var bool;
			fs.exists(views+'/templates/dashboard/'+template+'.jade',
				function (exists) {
					if(!exists) {
						res.statusCode = 404;
						res.render('404', {title:'404: File Not Found'});
						return;
					}
					res.render('templates/dashboard/'+template, {title:template});
					return;
				});
		});

	app.use('/templates', templates);

	//main views handler
	//IMPORTANT: because of the catchalls, specific routes should be placed
	//above this line
	app.route('/')
		.get(function(req,res) {
			res.render('home', {title:'home'});
		});

	app.route('/:template')
		.get(function(req, res, next) {
			var template = req.params.template.toLowerCase()
			var bool; 
			fs.exists(views+'/'+template+'.jade',
				function (exists) {
					if(!exists) {
						res.statusCode = 404;
						res.render('404', {title:'404: File Not Found'});
						return;
					}
					res.render(template, {title:template});
					return;
					
				});
		});

	//Load an API endpoint
	require('./views/api/')(app, models, io);

	//Set up 404
	app.route('*')
		.get(function (req, res, next) {
			res.status(404);
			if (req.accepts('html')) {
				res.render('404', 
					{
						title:'404: File Not Found',
						url: req.url
				});
				return;
			}

			// respond with json
			  if (req.accepts('json')) {
			    res.send({ error: 'Not found' });
			    return;
			  }

			  // default to plain-text. send()
			  res.type('txt').send('Not found');
			});
	//*/

};