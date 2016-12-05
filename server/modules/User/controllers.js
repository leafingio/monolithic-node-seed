var jwt = require('jsonwebtoken');
var User = require('./schemas');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');
var { Boom, Ok } = rootRequire('leafing');

var tokenConstants = {
  TYPES: {
		ACCESS_TOKEN: 1,
		REFRESH_TOKEN: 2,
	},
};

passport.use('username', new LocalStrategy(
	function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }

			if (!user) return done('Incorrect username or password');
			user.validPassword(password)
			.then(function (result) {
				if (result) return done(null, user);
				else done('Incorrect username or password');
			}).catch(function (err) {
				return done(err, null);
			});
		});
	}
));

passport.use('email', new LocalStrategy(
	function (username, password, done) {
		User.findOne({ email: username }, function (err, user) {
			if (err) return done(err);
			if (!user) return done('Incorrect email or password');
			user.validPassword(password)
			.then(function (result) {
				if (result) return done(null, user);
				else done('Incorrect email or password');
			}).catch(function (err) {
				return done(err, null);
			});
		});
	}
));

exports.CreateController = (req, res, next) => {
	if(!req.error){
		var newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		});

		User.findOne({
		$or: [
			{ username: req.body.username },
			{ email: req.body.email },
		],
		}, function(err, user) {
			if(err){
				Boom.badImplementation(req, 'Server internal error', err.errors);
				next();
			} else {
				if (user) {
					if(user.email === newUser.email) Boom.conflict(req, 'Email already in use', {})//return res.status(409).send('Email already in use');
					else Boom.conflict(req, 'Username already in use', {})//return res.status(409).send('Username already in use');
					next()
				} else {
					newUser.save(function(err) {
						if (err) Boom.badImplementation(req, 'Error saving user', err.errors)//return res.status(500).send();
						else Ok(req, newUser);
						next();
					});
				}
			}
		});
	} else next();
};

 exports.AuthenticateController = (req, res, next) => {
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

exports.SignTokenController = (req, res, next) => {
	if(!req.error){
		var token = jwt.sign({
			id: req.user.id,
			userVersion: req.user.__v,
			privileges: req.user.privileges,
			type: tokenConstants.TYPES.ACCESS_TOKEN,
		}, process.env.SERVER_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATIONTIME });

		var refreshToken = jwt.sign({
			id: req.user.id,
			userVersion: req.user.__v,
			privileges: req.user.privileges,
			type: tokenConstants.TYPES.REFRESH_TOKEN,
		}, process.env.SERVER_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATONTIME });

		var data = {
			token: token,
			refreshToken: refreshToken,
		};

		req.data = data;
		next();
	} else next();
};

exports.LoginController = (req, res, next) => {
	if(!req.error){
		if (req.user && req.data) Ok(req, req.data);
		else Boom.badImplementation(req, 'Server internal error');
		next()
	} else next()
};

exports.VerifyRefreshTokenController = (req, res, next) => {
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

exports.RefreshToken = (req, res, next) => {
	if(!req.error){
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

exports.RefreshTokenController = (req, res, next) => {
	if(!req.error){
		if (req.data) Ok(req, req.data);
		else Boom.badImplementation(req, 'Internal server error');
		next()
	} else next();
};
