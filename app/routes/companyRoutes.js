module.exports = (function() {
	'use strict';
	
var router = require('express').Router();

//Pull in Models

//CREATE ROUTES
//===========================================

//router middleware
router.user(function(req, res, next){
	next();
});

router.route('/')
	.post(function(req, res){
		//Creates a company
	})
	.get(function(req, res){
		//get all companies
	});
	
router.route('/:company_id') // Need a company ID field
	.get(function(req, res){
		//get company information
		//get all users in company
	})
	.put(function(req, res){
		//update company info
		//update all users in company
	})
	.delete(function(req, res){
		//Delete company
		//update all users in company
	});
	
	return router;
});