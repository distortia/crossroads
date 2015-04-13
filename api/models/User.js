/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcryptjs');

module.exports = {

	schema: true,

	attributes: {
		name: {
			type: 'string',
			required: true
		},

		level: {
			type: 'string',
			required: true
		},

		email: {
			type: 'string',
			email: true,
			unique: true,
			required: true
		},

		company: {
			type: 'string',
			required: true
		},

		online: {
			type: 'boolean',
			defaultsTo: false
		},

		admin: {
			type: 'boolean',
			defaultsTo: false
		},

		encryptedPassword: {
			type: 'string'
		},

		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirm;
			delete obj.encryptedPassword;
			delete obj._csrf;
			return obj;
		}
	},

	beforeValidation: function(values, next) {
		if (typeof values.admin !== 'undefined') {
			if (values.admin === 'unchecked') {
				values.admin = false;
			} else if (values.admin[1] === 'on') {
				values.admin = true;
			}
		}
		next();
	},

	beforeCreate: function(values, next) {
		// console.log(values); // For Debugging purposes
		if (values.level == "Company Admin"){
			User.find({ company: values.company }, function foundCompany(err, company) {
				if (err) return next(err);
				console.log(company);
				if (company) {
					return next({
						err: ['That company already exists. Please contact customer support if this is in error.']
					});
				}
			});
		} else {
			User.find({ company: values.company }, function foundCompany(err, company) {
				if (err) return next(err);
				console.log(company);
				if (!company) {
					return next({
						err: ['That company does not exist. Please create one or contact customer support if this is in error.']
					});
				}
			});
		}

		if (!values.password || values.password != values.confirm) {
			return next({
				err: ["Password does not match password confirmation."]
			});
		}
		bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.encryptedPassword = encryptedPassword;
			next();
		});
	}
};