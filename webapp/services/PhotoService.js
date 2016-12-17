var async = require('async');
var fileSystemUtil = require('fs-extra');
var appConstants = require('../constants/APP_CONSTANTS');
var uuidV4 = require('uuid/v4');
var PhotoModel = require('../models/PhotoModel');

var photoService = function() {

    var PHOTO_REST_URI = '/rest/photos/'
    var savePhotos = function(albumId,listImages, handlers) {

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
        console.log('Total images: '+listImages.length);
        var filesTransfered = 0;
        async.each(listImages, function(item, callBack) {

            var identifier = uuidV4(),
            	photoExtension = '.' + item.originalname.split('.').pop();
                destination = appConstants.WEBAPP_CONSTANTS.PHOTOS_DOWNLOAD_DIRECTORY + identifier+photoExtension,
                source = item.path,
                public_accessible_url = appConstants.WEBAPP_CONSTANTS.PHOTOS_PUBLIC_URL+identifier+photoExtension;

            var totalPhotos = listImages.length;
            
            var photoDTO = new PhotoModel({
                id: identifier,
                name: item.originalname,
                uri: PHOTO_REST_URI + identifier,
                created: Date.now(),
                location: destination,
                public_url : public_accessible_url,
                album_id :albumId
            });

            fileSystemUtil.copy(source, destination, function(err) {
                if (err) consoloe.log(error);
                    // if the transfer is succesfull insert into the db
                photoDTO.save(function(error, PhotoModel) {
                    console.log('saving photos');
                    console.log(PhotoModel);
                    if (error) {
                        console.log("something went wrong");
                    	callBack("ERROR "+error);
                    }
                    else {
                    	filesTransfered += 1;
                        console.log('Files transfered'+filesTransfered);
                    	if (filesTransfered === totalPhotos){
                            console.log('Image upload complete');
                    		callBack();
                    	}
                    }
                });
            });

        }, function(error) {
            console.log('Error'+error);
        	if(error){
        		handlers.error(error);
        	}
        	else{
                console.log('Successfully uploaded all the photos');
        		handlers.success(arrayOfPhotoUris);
        	}

        });
    };

    return {

        savePhotos: savePhotos

    };
}();

module.exports = photoService;