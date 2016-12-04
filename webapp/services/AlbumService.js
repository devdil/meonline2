var photoService = require('./PhotoService');
var AlbumModel = require('../models/AlbumModel');
var uuidV4 = require('uuid/v4');
var mongoose = require('mongoose');

var albumService = function() {

    var ALBUM_REST_URI_PREFIX = "/rest/albums/";

    var createAlbum = function(albumDTO, handlers) {
        // create the album with name,description and date
        // post call to photo service with all photos
        // once the photos are created recive an array of photos inserted as rest uri's
        // insert this array to album photos field
        var albumName,
            albumDescription,
            albumDate,
            albumIdentifier,
            restUri;

        albumIdentifier = uuidV4();
        albumName = albumDTO.albumName;
        albumDesctiption = albumDTO.albumDescription;
        albumDate = albumDTO.albumDate;
        restUri = ALBUM_REST_URI_PREFIX + albumIdentifier,
            albumPhotos = albumDTO.albumPhotos;

        var albumModel = new AlbumModel({
            id: albumIdentifier,
            name: albumName,
            description: albumDescription,
            date: albumDate,
            images: null,
            created: Date.now(),
            uri: restUri,
            status: 'Pending'
        });

        console.log("Going to create album");

        albumModel.save(function(error, albumModel) {

            if (error) {
                console.log("Error while adding album Model to database. exiting with: " + error);
            }

            var callBack = {
                success: function(results) {
                	console.log(albumModel.id);
                    AlbumModel.update({
                        "id": albumModel.id
                    }, {
                        "images": results,
                        "status" :"OK"
                    }, function(error, rawResponse) {
                        if (error) {
                            console.log(error);
                        }
                        if (rawResponse) {
                            console.log(rawResponse);
                        }
                    });
                },
                error: function(error) {
                	handlers.error(error);
                }
            };

            // call the photo service to insert all the photos
            photoService.savePhotos(albumPhotos, callBack);

        });

    };
    var deleteAlbum = function() {};
    var updateAlbum = function() {};
    var getAllAlbums = function(handlers) {

        AlbumModel.find({}).sort({
            'created': 'desc'
        }).exec(function(error, albumResources) {
            if (albumResources) {
                handlers.success(albumResources);
            }
            if (error) {
                handlers.error(error);
            }
        });

    };
    var getAlbumById = function() {};
    return {

        createAlbum: createAlbum,
        deleteAlbum: deleteAlbum,
        updateAlbum: updateAlbum,
        getAllAlbums: getAllAlbums,
        getAlbumById: getAlbumById
    };

}();

module.exports = albumService;