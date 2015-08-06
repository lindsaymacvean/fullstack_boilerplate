var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defaultSchema = new Schema({
	string: {
		type:String, 
		default: null,
		unique: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Default', defaultSchema);