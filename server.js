// server.js

//BASE SETUP
//======================================================


//Call the packages we need
var express 	= require('express');
var bodyParser 	= require('body-parser');
var mongoose	= require('mongoose');
var app 		= express(); //This creates a new express app

//Configure BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Set the server port
var port = process.env.PORT || 8880

//Setup Mongo
mongoose.connect('mongodb://localhost/crossroads');

//Configure Router and Routes
//======================================================
var router = express.Router();

//router middleware
router.use(function(req, res, next){
	console.log('Something is happening');
	// next() calls the next item so we dont stop after only one
	//We need to have next here or the app dies after one route.
	next(); 
});

//Test route to make sure routing is working
router.get('/', function(req, res){
	res.json({message: "its working!"});
});

//CREATE ROUTES
//=======================================================

//User Route
router.route('/users')
	//create a user from posting to /users
	.post(function(req, res){
		//Create a new user instance
		var user = new User();
		//Assign its name attribute from the request
		user.name = req.body.name;
		
		//Save the user and check for errors
		user.save(function(err){
			if (err)
				res.send(err);
				
			res.json({message: 'User created!'});
		});
	});



//Register Routes
app.use('/', router);


//Pull in Models
//=======================================================
var User = require('./app/models/user');


//Start the server
//=======================================================
app.listen(port);
console.log('Server working at port ' + port );

