var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var imageModel = new Schema({
	id : {
		type : String
	},
	name : {
		type : String
	},
	description : {
		type : String
	},
	uri : {
		type : String
	},
	date : {
		type : Date
	},
	location : {
		type : String
	}
});


module.exports = mongoose.model('Images',imageModel);
