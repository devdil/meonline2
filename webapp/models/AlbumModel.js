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
	created : {
		type : Date
	},
	status : {
		type : String
	},
	thumbnailPhotoUrl:{
		type: String
	}	
});

module.exports = mongoose.model('Albums',albumModel);
