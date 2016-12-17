var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var photoModel = new Schema({
	id : {
		type : String
	},
	album_id : {
		type: String
	},
	name : {
		type : String
	},
	uri : {
		type : String
	},
	created : {
		type : Date
	},
	location : {
		type : String
	},
	public_url : {
		type : String
	}
});


module.exports = mongoose.model('Photos',photoModel);
