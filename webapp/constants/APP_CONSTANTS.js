var APP_CONSTANTS = function() {

    var PHOTOS_DOWNLOAD_DIRECTORY = __dirname + '/../public/img/photos/';
    var TEMP_DIRECTORY = __dirname + '../temp';
    var DATABASE_NAME = 'mydb';
    var PHOTOS_PUBLIC_URL = '/img/photos/';

    return {

        WEBAPP_CONSTANTS: {
            PHOTOS_DOWNLOAD_DIRECTORY: PHOTOS_DOWNLOAD_DIRECTORY,
            DATABASE_NAME: DATABASE_NAME,
            PHOTOS_PUBLIC_URL : PHOTOS_PUBLIC_URL
        }

    }



}();

module.exports = APP_CONSTANTS;