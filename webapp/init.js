var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.port || 3000;
var path = require('path');

//require all routers and use its as a callback function of app.use middleware
var albumRouter = require('./routes/AlbumRoutes')();
//instruct middleware to serve static content from following directories
app.use(express.static('public'));
app.use(express.static('public/pages'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//register routes
//app.use('/api/images',galleryRouter);
app.use('/api/albums',albumRouter);

//register routes for static requests
/*app.get('/albums/',function(req,res){
	res.sendFile(path.join(__dirname+'/public/pages/albums.html'));
});*/

//starting the nodejs web server
app.listen(port,function(err){
	if (err){
	console.log("Error : "+error);
	}
	console.log("Server started at port: "+port);
});
