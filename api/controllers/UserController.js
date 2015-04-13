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
			name: req.param('name'),
			level: req.param('level'),
			email: req.param('email'),
			company: req.param('company'),
			password: req.param('password'),
			confirm: req.param('confirm')
		}

		//If user is company admin
		if (userObj.level == "Company Admin") {
			userObj.admin = true;
		}

		// Create a User with the params sent from 
		// the sign-up form --> new.ejs
		User.create(userObj, function userCreated(err, user) {

			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				// If error redirect back to sign-up page
				return res.redirect('/user/new');
			}

			// Log user in
			req.session.authenticated = true;
			req.session.user = user;



			// Change status to online
			user.online = true;
			user.save(function(err, user) {
				if (err) return next(err);

				// add the action attribute to the user object for the flash message.
				user.action = " signed-up and logged-in."

				// Let other subscribed sockets know that the user was created.
				User.publishCreate(user);

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
			name: req.param('name'),
			company: req.param('company'),
			level: req.param('level'),
			email: req.param('email'),
			admin: req.param('admin'),
			company: req.param('company'),
			level: req.param('level')
		}
		//This checks for the admin checkbox values
		if (userObj.admin === 'unchecked') {
			userObj.admin = false;
		} else if (userObj.admin[1] === 'on') {
			userObj.admin = true;
		} else {
			var userObj = {
				name: req.param('name'),
				company: req.param('company'),
				level: req.param('level'),
				email: req.param('email')
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

				// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
				User.publishUpdate(user.id, {
					name: user.name,
					action: ' has been destroyed.'
				});

				// Let other sockets know that the user instance was destroyed.
				User.publishDestroy(user.id);

			});

			res.redirect('/user');

		});
	},

	// This action works with app.js socket.get('/user/subscribe') to
	// subscribe to the User model classroom and instances of the user
	// model
	subscribe: function(req, res) {

		// Find all current users in the user model
		User.find(function foundUsers(err, users) {
			if (err) return next(err);

			// subscribe this socket to the User model classroom
			User.subscribe(req.socket);

			// subscribe this socket to the user instance rooms
			User.subscribe(req.socket, users);

			// This will avoid a warning from the socket for trying to render
			// html over the socket.
			res.send(200);
		});
	}

};