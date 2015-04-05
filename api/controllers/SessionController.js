/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcryptjs');

module.exports = {
	'new': function(req, res) {
		res.view('session/new');
	},
	create: function(req, res, next) {
		//Check if email or password exists
		if (!req.param('email') || !req.param('password')) {
			var usernamePasswordRequiredError = [{
				name: 'usernamePasswordRequired',
				message: 'You must enter both a username and a password.'
			}]
			req.session.flash = {
				err: usernamePasswordRequiredError
			}
			res.redirect('/session/new');
			return;
		}
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);

			if (!user) {
				var noAccountError = [{
					name: 'noAccount',
					message: 'The email address' + req.param('email') + ' was not found'
				}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}

			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'usernamePasswordMismatch',
						message: 'Invalid username and password combination'
					}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
				}
				//Authenticate User
				req.session.authenticated = true;
				req.session.user = user;
				//User is online
				user.online = true;
				user.save(function(err, next) {
					if (err) return next(err);

					//Redirect for admins
					if (req.session.user.admin) {
						res.redirect('/user/');
						return;
					}
					res.redirect('/user/show/' + user.id);
				});
			});
		});
	},

	destroy: function(req, res, next) {
		User.findOne(req.session.user.id, function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('User not found');

			var userId = req.session.user.id;

			user.update(userId, {
					online: false
				},
				function(err) {
					if (err) return next(err);
					req.session.destroy();
					res.redirect('/session/new');
				});
		});
	}
};