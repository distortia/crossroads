// server.js

//BASE SETUP
//======================================================


//Call the packages we need
var express 	= require('express');
var bodyParser 	= require('body-parser');
var app 		= express(); //This creates a new express app

//Configure BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Set the server port
var port = process.env.PORT || 8880

//Configure Router and Routes
//======================================================
var router = express.Router();

//Test route to make sure routing is working
router.get('/', function(req, res){
	res.json({message: "its working!"});
});

//Additional Routes go here

//Register Routes
app.use('/', router);

//Start the server
//=======================================================
app.listen(port);
console.log('Server working at port ' + port );

