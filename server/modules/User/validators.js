
var jwt = require('jsonwebtoken');
var validator = require('validator');
var { Boom, Ok } = rootRequire('leafing');
var passport = require('passport');

var tokenConstants = {
  TYPES: {
		ACCESS_TOKEN: 1,
		REFRESH_TOKEN: 2,
	},
};

var User = require('./schemas');

var tokenConstants = {
  TYPES: {
		ACCESS_TOKEN: 1,
		REFRESH_TOKEN: 2,
	},
};

exports.isUnique = (req, res, next) => {
	if(!req.error){
		var query = {}
		if(!req.body.username && !req.body.email) next()
		else {
			if(req.body.email) query = { email: req.body.email }
			else query = { username: req.body.username }
			User.findOne({
			$or: [
				{ username: req.body.username },
				{ email: req.body.email },
			],}, function(err, user) {
				if (!err) {
					if (user) {
						if (user.username === req.body.username) Boom.conflict(req, 'Username already exists', {})
						if (user.email === req.body.email) Boom.conflict(req, 'Email already exists', {})
					}
				} else Boom.badImplementation(req, 'Internal server error', {});

				next();
			});
		}
	} else next();
};

exports.isRefreshToken = (req, res, next) => {
	if(!req.error){
		jwt.verify(req.header('Authorization'), process.env.SERVER_SECRET, function (err, verified) {
			if (err) Boom.unauthorized(req, err.message, err );
			else {
				if (verified.type === tokenConstants.TYPES.ACCESS_TOKEN)
					Boom.unauthorized(req, 'An access token can not be used as an refresh token', {});
				else req.verified = verified;
			}
			next()
		});
	} else next();
};

exports.isToken = (req, res, next) => {
	if(!req.error){
		if(req.header('Authorization')){
			jwt.verify(req.header('Authorization'), process.env.SERVER_SECRET, function (err, verified) {
				if (err) Boom.unauthorized(req, err.message, err); 
				else {
					if (verified.type === tokenConstants.TYPES.REFRESH_TOKEN)
						Boom.unauthorized(req, 'A refresh token can not be used as an access token', {});
					else req.verified = verified;
				}
				next()
			});
		} else next();
	} else next()
};

exports.existsToken = (req, res, next) => {
	if(!req.error && req.verified){
		User.findById(req.verified.id, function (err, user) {
			if (err) Boom.badImplementation(req, 'Internal server error');
			if (!user) Boom.notFound(req, 'User not found');
			if (req.verified.userVersion !== user.__v) Boom.unauthorized(req, 'Unauthorized');
			if (user.isBanned) Boom.unauthorized(req, 'Unauthorized');
			req.user = user;
			next()
		});
	} else next();
};

 exports.Authenticate = (req, res, next) => {
	if(!req.error){
		if (validator.isEmail(req.body.username)) {
			passport.authenticate('email', function (err, user) {
				if (err){
					Boom.unauthorized(req, 'Unathorized', err);
					next();
				}
				else req.logIn(user, { session: false }, next);
			})(req, res, next);
		} else {
			passport.authenticate('username', function (err, user) {
				if (err){
					Boom.unauthorized(req, 'Unauthorized', err);
					next();
				} else req.logIn(user, { session: false }, next);
			})(req, res, next);
		}
	} else next();
};
