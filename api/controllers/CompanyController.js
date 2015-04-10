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

	create: function(req, res, next) {

		var companyObj = {
			name: req.param('name'),
			owner: req.param('owner')
		}

		// Create a Company with the params sent from 
		// the sign-up form --> new.ejs
		Company.create(companyObj, function companyCreated(err, company) {

			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				// If error redirect back to sign-up page
				return res.redirect('/company/new');
			}

			company.save(function(err, company) {
				if (err) return next(err);

				res.redirect('/company/show/' + company.id);
			});
		});
	},

	// render the profile view (e.g. /views/show.ejs)
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

		// Get an array of all companies in the Company collection(e.g. table)
		Company.find(function foundCompanys(err, companies) {
			if (err) return next(err);
			// pass the array down to the /views/index.ejs page
			res.view({
				companies: companies
			});
		});
	},

	// render the edit view (e.g. /views/edit.ejs)
	edit: function(req, res, next) {

		// Find the company from the id passed in via params
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
			name: req.param('name'),
			owner: req.param('owner')
		}

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
	}
};