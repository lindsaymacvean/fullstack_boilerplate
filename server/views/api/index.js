
var express = require('express');
module.exports = function (app, models, io) {
	//set up a router object
	var base = express.Router();

	base.route('/')
		.get(function (req, res) {
			res.json({message:'You got everything'});
		});

	base.route('/:id')
		.get(function (req, res) {
			res.json({message:'You got something'});
		})
		.post(function (req, res) {
			res.json({message:'You posted something'});
		})
		.put(function (req, res) {
			res.json({message:'You updated something'});
		})
		.delete(function (req, res) {
			res.json({message:'You deleted something'});
		});

	app.use('/api', base);
}; 