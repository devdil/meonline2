var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumModel = new Schema({
	id : {
		type : String
	},
	name : {
		type : String
	},
	description : {
		type : String
	},
	date : {
		type : Date	
	},
	uri : {
		type : String
	},
	images : {
		type : Array
	},
	created : {
		type : Date
	},
	status : {
		type : String
	}	
});

module.exports = mongoose.mode('Albums',albumModel);
