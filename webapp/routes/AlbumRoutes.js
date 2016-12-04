var express = require('express');
var albumRouter = express.Router();
var router = function(){
    var albumController = require('../controllers/AlbumController')();
	albumRouter.route('/').
			get(albumController.getAll).
			post(albumController.post);
	albumRouter.route('/:id').
			get(albumController.getById);

	return albumRouter;

};

module.exports = router;
