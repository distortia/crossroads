/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcryptjs');

module.exports = {
	// mongo does use a schema, so its commented out for now
	// schema: true,

	attributes: {
		
		firstName: {
			type: 'string',
			required: true
		},

		lastName: {
			type: 'string',
			required: true
		},
		//USER ADMIN LEVEL IS BROKEN DOWN INTO 4 categories
		//Crossroads Admin 	- 0
		//Company Owner		- 1
		//Site Admin		- 2
		//Content Admin		- 3  -- lowest form of rights
		adminLevel: {
			type: 'integer',
			defaultsTo: '3'
		},

		email: {
			type: 'string',
			email: true,
			unique: true,
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

		phoneNumber: {
			type: 'string',
			maxLength: 10
		},

		encryptedPassword: {
			type: 'string'
		},

		companies: {
			collection: "company",
			via: 'users',
			dominant: true
		},
		//When a user joins a company, they must be approved by the company admin or site admin
		//Maybe convert these to integers to make it easier and quicker to process
		approved: {
			type: 'string',
			enum: ['pending','approved', 'denied'] 
		}, 
		//Attribute methods
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirm;
			delete obj.encryptedPassword;
			delete obj._csrf;
			return obj;
		},

		getFullName: function() {
			return this.firstName + ' ' + this.lastName;
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
		bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			values.encryptedPassword = encryptedPassword;
			next();
		});

	}

};