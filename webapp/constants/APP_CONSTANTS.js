var APP_CONSTANTS = function() {

    var PHOTOS_DOWNLOAD_DIRECTORY = __dirname + '/../public/img/photos/';
    var TEMP_DIRECTORY = __dirname + '../temp';
    var DATABASE_NAME = 'mydb';
    var PHOTOS_PUBLIC_URL = '/img/photos/';

    return {

        WEBAPP_CONSTANTS: {
            PHOTOS_DOWNLOAD_DIRECTORY: PHOTOS_DOWNLOAD_DIRECTORY,
            DATABASE_NAME: DATABASE_NAME,
            PHOTOS_PUBLIC_URL: PHOTOS_PUBLIC_URL
        },

        HTTP_CONSTANTS: {

            "2XX": {
                "200": {
                    "statusCode": "200",
                    "status": "OK",
                    "methods": ["get", "getAll"]
                },
                "202": {
                    "statusCode": "202",
                    "status": "Accepted",
                    "methods": ["post", "asynchronous"]
                },
                "201": {
                    "statusCode": "201",
                    "status": "Created",
                    "methods": ['post']
                },
                "204": {
                    "statusCode": "204",
                    "status": "No Content",
                    "methods": ["delete"]
                }

            }

        }

    }



}();

module.exports = APP_CONSTANTS;