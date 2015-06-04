/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function(req, res) {
		res.view();
	},

	'join': function(req, res){
		res.view();
	},

	create: function(req, res, next) {
		var companyObj = {
			companyName: 	req.param('companyName'),
			street: 			req.param('street'),
			city: 			req.param('city'),
			state: 			req.param('state'),
			zipCode: 		req.param('zipCode'),
			userList: 		req.session.user.id,
			owner: 			req.session.user.id
		};

		Company.create(companyObj, function companyCreated(err, company) {
			if (err) {
				req.session.flash = {
					err: ["Company already exists. If this is in error, please contact support"]
				}
				// If error redirect back to sign-up page
				return res.redirect('/company/new');
			}

			User.update(req.session.user.id, {companyList: company.id}, function userUpdated(err, user){
				if(err) return next(err);
				if(!user) return next();
			});

			company.save(function(err, company) {
				if (err) return next(err);
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
			street: 			req.param('street'),
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

		//Error checking for blank company name
		if (!req.param('companyName')){
			req.session.flash = {
				err: ["Please fill out the company name"]
			}
			return res.redirect('/company/join');
		}
		//find company by name
		// Company.findOne({companyName: req.param('companyName')}).populate('userList').exec(function (err, company){
		Company.find({companyName: req.param('companyName')}).exec(function (err, company){
			if (err) {
				req.session.flash = {
					err: err
				}
				return res.redirect('/company/join');
			}
			if (!company.length) {
				req.session.flash = {
					err: ["Company does not exist. If this is in error, please contact support"]
				}
				return res.redirect('/company/join');
			}
			//thisCompany.user.add(req.session.user.id)?

			//get company.id from search
			var companyId = company[0].id;

			//update user with  company.id to companyList array
			User.find(req.session.user.id).populate('companyList').exec(function (err, user){
				theUser = user[0];
				console.log("companyId", companyId);
				console.log("USER", theUser);
				console.log("YOLO", theUser.companyList);
				console.log("CompanyList", theUser.comanyList);
				theUser.companyList.add(companyId);
				theUser.save(function(err){
					console.log("User Updated with company");
				});
			});
			res.redirect('/company');
		});

	}

};