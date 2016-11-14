var albumController = function(){
	
	var post = function(req,resp){
	console.log("POST RECEIVED");	
	resp.status(201).send("Request Accepted");
	};

	var get = function(req,resp){
	console.log("GET ACCEPTED");
	resp.status(200).send("Sample Text");	
	};
	
	var getAll = function(req,resp){
	console.log("GET ALL ACCEPTED");
	resp.status(200).send("Getting all albums");
	};

	return {

		get : get,
		getAll : getAll,
		post : post

	};

};


module.exports = albumController;
