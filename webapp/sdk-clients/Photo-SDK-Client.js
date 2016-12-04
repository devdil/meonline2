var request = require('request');

var photoSDKClient = function() {

    var PHOTO_REST_URI = '/rest/photos/'

    var getByID = function(headers, id, handlers) {

        var options = {
            url: PHOTO_REST_URI + id,
            method: GET,
            headers: null
        };

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
                handlers.success(body);
            }
            else
            	handlers.error(response.statusCode);
        })
    };

    var getAll = function(headers) {
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body)
            }
        })
    };

    var post = function(headers, postObject) {

    };

    var put = function(headers, putObject) {

    };

    return {

        getAll: getAll,
        getById: getById,
        post: post,
        put: put

    };
}

module.exports = photoSDKClient;