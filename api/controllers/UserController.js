/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

	// This loads the sign-up page --> new.ejs
	'new': function(req, res) {
		res.view();
	},

	create: function(req, res, next) {

		var userObj = {
			firstName: 		req.param('firstName'),
			lastName: 		req.param('lastName'),
			fullName: 		req.param('fullName'),
			email: 			req.param('email'),
			phoneNumber: 	req.param('phoneNumber'),
			password: 		req.param('password'),
			adminLevel: 	req.param('adminLevel'),
			confirm: 		req.param('confirm')
		}

		// Create a User with the params sent from 
		// the sign-up form --> new.ejs
		User.create(userObj, function userCreated(err, user) {

			if (err) {
				req.session.flash = {
					err: err
				}

				// If error redirect back to sign-up page
				return res.redirect('/user/new');
			}

			// Log user in
			req.session.authenticated = true;
			req.session.user = user;
			// req.session.user.adminLevel = adminLevel;

			// Change status to online
			user.online = true;
			user.save(function(err, user) {
				if (err) return next(err);

				// add the action attribute to the user object for the flash message.
				user.action = " signed-up and logged-in."

				// After successfully creating the user
				// redirect to the show action
				res.redirect('/user/show/' + user.id);
			});
		});
	},

	// render the profile view (e.g. /views/show.ejs)
	show: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},

	index: function(req, res, next) {

		// Get an array of all users in the User collection(e.g. table)
		User.find(function foundUsers(err, users) {
			if (err) return next(err);
			// pass the array down to the /views/index.ejs page
			res.view({
				users: users
			});
		});
	},

	// render the edit view (e.g. /views/edit.ejs)
	edit: function(req, res, next) {

		// Find the user from the id passed in via params
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('User doesn\'t exist.');

			res.view({
				user: user
			});
		});
	},

	// process the info from edit view
	update: function(req, res, next) {
		var userObj = {
			firstName: 		req.param('firstName'),
			lastName: 		req.param('lastName'),
			fullName: 		req.param('fullName'),
			adminLevel: 	req.param('adminLevel'),
			email: 			req.param('email'),
			phoneNumber: 	req.param('phoneNumber'),
			admin: 			req.param('admin')
		}

		if (userObj.adminLevel != "0") {
			userObj.admin = false;
		} else if (userObj.adminLevel === '0') {
			userObj.admin = true;
		} else {
			var userObj = {
			firstName: 		req.param('firstName'),
			lastName: 		req.param('lastName'),
			fullName: 		req.param('fullName'),
			adminLevel: 	req.param('adminLevel'),
			email: 			req.param('email'),
			phoneNumber: 	req.param('phoneNumber')
			}
		}

		User.update(req.param('id'), userObj, function userUpdated(err) {
			if (err) {
				return res.redirect('/user/edit/' + req.param('id'));
			}

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);

			if (!user) return next('User doesn\'t exist.');

			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});

			res.redirect('/user');

		});
	}
};