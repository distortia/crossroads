module.exports = (function() {
	'use strict';
	
var router = require('express').Router();

//Pull in Models
var Company = require('../models/company');
//CREATE ROUTES
//===========================================

//router middleware
router.user(function(req, res, next){
	next();
});

router.route('/')
	.post(function(req, res){
		//Creates a company
		var companyObj = {
			companyName: 	req.body.companyName,
			owner: 			req.body.owner,
			address:		req.body.address,
			city:			req.body.city,
			state:			req.body.state,
			zip:			req.body.zip,
			plan:			req.body.plan,
			users:{
				user_id:		req.body.user_id
			}
		};
		
		//Create a company
		var company = new Company(companyObj);
		
		company.save(function(err){
			if (err) res.send(err);
			res.json({message: 'Company created'});
		});
	}) // end post
	.get(function(req, res){
		//get all companies
		Company.find(function(err, companies){
			if (err) res.send(err);
			res.json(companies);
		});
	}); //end get
	
router.route('/:company_id') // Need a company ID field
	.get(function(req, res){
		//get company information
		//get all users in company
		Company.findById(req.params.company_id, function(err, company){
			if (err) res.send(err);
			res.json(company);
		});
	}) // end get
	.put(function(req, res){
		//update company info
		//update all users in company
		var companyObj = {
			companyName: 	req.body.companyName,
			owner: 			req.body.owner,
			address:		req.body.address,
			city:			req.body.city,
			state:			req.body.state,
			zip:			req.body.zip,
			plan:			req.body.plan,
			users:{
				user_id:		req.body.user_id
			}
		};
		Company.findByIdAndUpdate(req.params.company_id, companyObj, function(err, company){
			if (err) res.send(err);
			res.json({message: 'Company Updated'});
		}); // End put
	})
	.delete(function(req, res){
		//Delete company
		//update all users in company
		Company.remove({
			_id: req.params.company_id
		}, function(err, company){
			if (err) res.send(err);
			res.json({message: 'Company Deleted'});
		});
	});
	
	return router;
});