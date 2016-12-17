var multer = require('multer');
var upload = multer({
    dest: __dirname + '/../temp'
});
var albumService = require('../services/AlbumService');
var appConstants = require('../constants/APP_CONSTANTS');


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
            success: function(results) {
                resp.status(200).send("Request succeeded");
            },
            error: function(error) {
                resp.status(503).send("Could not complete the request" + error);
            }
        };

        albumService.createAlbum(albumDTO);

        resp.status(201).send("Request Accepted");
    };

    /*
    	method type : GET
    	sample url  : /rest/albums/:id
    	url params:
    		@param id  		: The unique album Identifer
    	returns:
    	    status code : 200 OK
    	    respose body:
    				albumObject
    				example: {
								"id" : "923ad349-cfe3-4196-a771-60f71e2cfd8e",
								"name" : "test",
								"date" : "2016-12-14T00:00:00Z",
								"created" : "2016-12-04T14:44:01.143Z",
								"uri" : "/rest/albums/923ad349-cfe3-4196-a771-60f71e2cfd8e",
								"status" : "OK",
								"images" : [
									"/rest/photos/8bdfd9cc-5285-4a6c-bc43-ce2dac8b7c4d"
								],
							}
    */

    var getById = function(req, resp) {
        console.log("GET ACCEPTED");
        var albumId = req.params.id
        var callBack = {
        	success:function(results){
        		resp.status(appConstants.HTTP_CONSTANTS["2XX"]["200"].statusCode).send(results);
        	},
        	error : function(error){
        		resp.status(404).send(error);
        	}
        };
        albumService.getAlbumById(albumId,callBack);
    };

    /*
    	method type : GET
    	sample url : /rest/albums
    	returns:
    	    status code : 200 OK
    	    respose body:
    				array of albumObjects
    				example : [
    							{
									"id" : "923ad349-cfe3-4196-a771-60f71e2cfd8e",
									"name" : "test",
									"date" : "2016-12-14T00:00:00Z",
									"created" : "2016-12-04T14:44:01.143Z",
									"uri" : "/rest/albums/923ad349-cfe3-4196-a771-60f71e2cfd8e",
									"status" : "OK",
									"images" : [
										"/rest/photos/8bdfd9cc-5285-4a6c-bc43-ce2dac8b7c4d"
									],
								}
    						]
    		
    */

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

        getById: getById,
        getAll: getAll,
        post: [upload.array('albumPhotos', 20), post]

    };

};


module.exports = albumController;