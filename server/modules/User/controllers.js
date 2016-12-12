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

exports.Create = (req, res, next) => {
	if(!req.error){
		console.log(' create')
		var newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		newUser.save(function(err) {
			if (err) Boom.badImplementation(req, 'Internal server error', err.errors)
			else Ok(req, newUser);
			next();
		});
	} else next();
};

exports.SignTokens = (req, res, next) => {
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

exports.SendTokens = (req, res, next) => {
	if(!req.error){
		if (req.data) Ok(req, req.data);
		else Boom.badImplementation(req, 'Internal server error');
		next()
	} else next();
};


