
var imageService = require('../services/ImageService');

var imageController = function(){
	
	var post = function(req,res){
		var imageDTO = {
			name : req.body.name,
			description : req.body.description,
			location : req.body.location
		};

		var callBack = {
			success : function(result){

			},
			error : function(error){
			
			}	
		};
		imageService.saveImage(imageDTO, callBack);
	};

	var getAll = function(req,resp){


	});

	var getById = function(req,resp){


	});

};

module.exports = imageController;
