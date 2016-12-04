var multer = require('multer');
var upload = multer({
    dest: __dirname + '/../temp'
});
var albumService = require('../services/AlbumService');


/*
	Request uri : /rest/albums/
	Actions supported : POST,DELETE,GET,PUT
*/

var albumController = function() {


    /*
    	method type : POST
    	parameters:
    		@param albumName  		: The name of the album
    		@param albumDescription : A short descriptive message to know what your album contains
    		@param albumDate 		: When was your album clicked
    		@param photos 			: A collection of photos that will go into your album
    	returns:
    	    status code : 201 Accepted
    	    respose body:
    				taskuri : /rest/task/232300-sdasd-fsfdsfds A uri to poll for status
    		
    */
    var post = function(req, resp) {

        console.log("name" + req.body.albumName);
        console.log("description" + req.body.albumDescription);
        console.log("date" + req.body.albumDate);
        console.log("files" + req.files);

        var albumDTO = {
            albumName: req.body.albumName,
            albumDescription: req.body.albumDescription,
            albumDate: req.body.albumDate,
            albumPhotos: req.files
        };

        var callback = {
        	success : function (results){
        		resp.status(200).send("Request succeeded");
        	},
        	error : function (error){
        		resp.status(503).send("Could not complete the request"+error);
        	}
        };

        albumService.createAlbum(albumDTO);

        resp.status(201).send("Request Accepted");
    };

    var get = function(req, resp) {
        console.log("GET ACCEPTED");
        resp.status(200).send("Sample Text");
    };

    var getAll = function(req, resp) {
        console.log("GET ALL ACCEPTED");
        var callBack = {
            success: function(albumResources) {
                // the reponse was successfull, throw this back as a repsonse
                resp.status(200).send(albumResources);
            },
            error: function(error) {
                resp.status(503).send("Service Unavailable");
            }
        }
        albumService.getAllAlbums(callBack);
    };

    return {

        get: get,
        getAll: getAll,
        post: [upload.array('albumPhotos', 20), post]

    };

};


module.exports = albumController;