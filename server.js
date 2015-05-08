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
var port = process.env.PORT || 8880;

//Setup Mongo
mongoose.connect('mongodb://localhost/crossroads');


//Pull in Models
//=======================================================
var User = require('./app/models/user.js');



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

//User Route - Create / List all
router.route('/users')
	//create a user from using POST at /users
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
	})	//end post
	//get all users from using GET at /users
	.get(function(req, res){
		User.find(function(err, users){
			if (err)
				res.send(err);
				
			res.json(users);
		});	
	}); //end get

//User Route - Edit / Show / Delete by ID
router.route('/users/:user_id')
	//Get the user with the id
	.get(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if (err)
				res.send(err);
			res.json(user);
		});
	}) //end /users/:user_id
  	.put(function(req, res){
		 //Get the user with the id
		 User.findById(req.params.user_id, function(err, user){
			if (err)
				res.send(err);
			user.name = req.body.name; // Updates the users name
			//save the new user info
			user.save(function(err){
				if (err)
					res.send(err);
				res.json({message: 'User udpated!'});	
			});
		 });
	  }) // end put 
	  .delete(function(req, res){
		 User.remove({
			 _id: req.params.user_id
		 }, function(err,user){
			 if (err)
			 	res.send(err);
			 res.json({message: 'User Deleted'});
		 });
	  });
	  


//Register Routes
app.use('/', router);

//Start the server
//=======================================================
app.listen(port);
console.log('Server working at port ' + port );

