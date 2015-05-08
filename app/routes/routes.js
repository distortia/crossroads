module.exports = (function() {
//    'use strict';
var router = require('express').Router();
	
//Pull in Models	
var User = require('../models/user');

//CREATE ROUTES
//=======================================================

//router middleware
router.use(function(req, res, next){
//	console.log('Something is happening');
	// next() calls the next item so we dont stop after only one
	//We need to have next here or the app dies after one route.
	next(); 
});


//Test route to make sure routing is working
router.get('/', function(req, res){
	res.json({message: "routes are working"});
});

//User Route - Create / List all
router.route('/users')
	//create a user from using POST at /users
	.post(function(req, res){

		//Create a userObj variable to store all of the 
		// model's attributes
		var userObj = {
			firstName: 	req.body.firstName,
			lastName:	req.body.lastName,
			email: 		req.body.email,
			phone:	 	req.body.phone,
			company: {
				companyName: 	req.body.companyName,
				address:		req.body.address,
				city:			req.body.state,
				zip:			req.body.zip,
				owner: 			req.body.owner,
				adminLevel:		req.body.adminLevel,
				approved:		req.body.approved
			}
		};
		
		//Create a new user instance
		var user = new User(userObj);
		
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

    return router;
})();