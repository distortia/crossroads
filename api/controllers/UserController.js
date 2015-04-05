/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function(req, res) {
		res.view();
	},

	'create': function(req, res, next) {
		User.create(req.params.all(), function userCreated(err, user) {
			if (err) {
				console.log(err);
				req.session.flash = {
						err: err
					}
					//returns back to signup if error
				return res.redirect('/user/new')
			}
			//After creating user, redirect to show action
			req.session.authenticated = true;
			req.session.User = user;

			user.online = true;
			user.save(function(err,next){
				if (err) return next(err);
				res.redirect('/user/show/'+ user.id);
			});
		});
	},

	'show': function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});

	},

	'index': function(req, res, next) {
		User.find(function foundUsers(err, users) {
			if (err) return next(err);
			res.view({
				users: users
			});
		});
	},

	'edit': function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},

  update: function(req, res, next) {

    if (req.session.user.admin) {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
        admin: req.param('admin')
      }
    } else {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
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

	'destroy': function(req, res, netx) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next('User does not exist');
			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});
			res.redirect('/user');
		});

	}
};