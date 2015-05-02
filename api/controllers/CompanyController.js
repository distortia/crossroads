/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	// This loads the sign-up page --> new.ejs
	'new': function(req, res) {
		res.view();
	},
	
	'join': function(req, res){
		res.view();
	},
	
	create: function(req, res, next) {

		var companyObj = {
			companyName: 	req.param('companyName'),
			street: 		req.param('street'),
			city: 			req.param('city'),
			state: 			req.param('state'),
			zipCode: 		req.param('zipCode'),
			owner: 			req.session.user.id
		};


		//Comany.update company.owner with req.session.user.id
		Company.create(companyObj, function companyCreated(err, company) {
			if (err) {
				req.session.flash = {
					err: ["Company already exists. If this is in error, please contact support."]
				};
				// If error redirect back to sign-up page
				return res.redirect('/company/new');
			}
			
			User.update(req.session.user.id, {company: company.id}, function userUpdated(err,user){
				if(err) return next(err);
				if(!user) return next();
			});

			company.save(function(err, company) {
				if (err) return next(err);
				// After successfully creating the company
				// redirect to the show action
				res.redirect('/company/show/' + company.id);
			});
		});
	},

	show: function(req, res, next) {
		Company.findOne(req.param('id'), function foundCompany(err, company) {
			if (err) return next(err);
			if (!company) return next();
			res.view({
				company: company
			});
		});
	},

	index: function(req, res, next) {
		// Get an array of all companies in the company collection(e.g. table)
		Company.find(function foundCompanies(err, companies) {
			if (err) return next(err);
			// pass the array down to the /views/index.ejs page
			res.view({
				companies: companies
			});
		});
	},

	// render the edit view (e.g. /views/edit.ejs)
	edit: function(req, res, next) {
		// Find the Company from the id passed in via params
		Company.findOne(req.param('id'), function foundCompany(err, company) {
			if (err) return next(err);
			if (!company) return next('Company doesn\'t exist.');
			res.view({
				company: company
			});
		});
	},

	// process the info from edit view
	update: function(req, res, next) {

		var companyObj = {
			companyName: 	req.param('companyName'),
			street: 		req.param('street'),
			city: 			req.param('city'),
			state: 			req.param('state'),
			zipCode: 		req.param('zipCode')
		};

		Company.update(req.param('id'), companyObj, function companyUpdated(err) {
			if (err) {
				return res.redirect('/company/edit/' + req.param('id'));
			}

			res.redirect('/company/show/' + req.param('id'));
		});
	},


	destroy: function(req, res, next) {

		Company.findOne(req.param('id'), function foundCompany(err, company) {
			if (err) return next(err);

			if (!company) return next('Company doesn\'t exist.');

			Company.destroy(req.param('id'), function companyDestroyed(err) {
				if (err) return next(err);
			});
			
			res.redirect('/company');

		});
	},
	
	joinCompany: function(req,res, next){
		compName = req.param('companyName');
		console.log(req.param('companyName'));
		Company.find({companyName:compName}).exec(function foundCompany(err, company){
			console.log(company);
			
			if (err || company.length === 0){
				console.log("got here");
				req.session.flash = {
					err: ["Company doesn\'t exist. If this is in error, please contact support."]
				};
				return req.session.flash;
			}
//			User.update(req.session.user.id, {company: req.param('companyName')}).exec(function userUpdated(err){
//					if (err) return err;
//					console.log('Updating ' + req.session.user.id + ' with ' + req.param('companyName'));
//				});
			});	
		res.redirect('/company');
	}

};

