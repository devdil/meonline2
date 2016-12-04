var async = require('async');
var fileSystemUtil = require('fs-extra');
var appConstants = require('../constants/APP_CONSTANTS');
var uuidV4 = require('uuid/v4');
var PhotoModel = require('../models/PhotoModel');

var photoService = function() {

    var PHOTO_REST_URI = '/rest/photos/'
    var savePhotos = function(listImages, handlers) {

        // for each image in the list
        // move the image from temp directory to public/img/photos
        /*
        	for clarity the image object in the list would look like
        {
            fieldname: 'albumPhotos',
            originalname: 'image_info.info',
            encoding: '7bit',
            mimetype: 'application/octet-stream',
            destination: '/home/diljit/Documents/meonline2/webapp/controllers/../temp',
            filename: 'fb01a91118a6e3e9733c78ac481586bc',
            path: '/home/diljit/Documents/meonline2/webapp/temp/fb01a91118a6e3e9733c78ac481586bc',
            size: 148
        }

        */
        var arrayOfPhotoUris = [];
        async.each(listImages, function(item, callBack) {

            var identifier = uuidV4(),
            	photoExtension = '.' + item.originalname.split('.').pop();
                destination = appConstants.WEBAPP_CONSTANTS.PHOTOS_DOWNLOAD_DIRECTORY + identifier+photoExtension,
                source = item.path,
                public_accessible_url = appConstants.WEBAPP_CONSTANTS.PHOTOS_PUBLIC_URL+identifier+photoExtension;

            var totalPhotos = listImages.length;
            var filesTransfered = 0;


            var photoDTO = new PhotoModel({
                id: identifier,
                name: item.originalname,
                uri: PHOTO_REST_URI + identifier,
                created: Date.now(),
                location: destination,
                public_url : public_accessible_url
            });

            fileSystemUtil.copy(source, destination, function(err) {
                if (err) consoloe.log(error);
                    // if the transfer is succesfull insert into the db
                photoDTO.save(function(error, PhotoModel) {
                    if (error) {
                        console.log("something went wrong");
                    	callBack("ERROR "+error);
                    }
                    else {
                    	filesTransfered += 1;
                    	arrayOfPhotoUris.push(PhotoModel.uri);
                    	if (filesTransfered === totalPhotos){
                    		callBack();
                    	}
                    }
                });
            });

        }, function(error) {

        	if(error){
        		handlers.error(error);
        	}
        	else{
        		handlers.success(arrayOfPhotoUris);
        	}

        });
    };

    return {

        savePhotos: savePhotos

    };
}();

module.exports = photoService;