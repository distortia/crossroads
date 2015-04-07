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
		//reporpose this attribute, kind of useless
		title: {
			type: 'string',
			required: true
		},

		email: {
			type: 'string',
			email: true,
			unique: true,
			required: true
		},

		company:{
			type: 'string'
		}

		online: {
			type: 'boolean',
			defaultsTo: false
		},
		
		admin: {
			type: 'boolean',
			defaultsTo: false
		},

		encryptedPassword: {
			type: 'string' //,
				// required: true
		},

		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirmation;
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
		if (!values.password || values.password != values.confirm) {
			return next({
				err: ["Password does not match password confirmation."]
			});
		}
		require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.encryptedPassword = encryptedPassword;
			next();
		});
	}
};