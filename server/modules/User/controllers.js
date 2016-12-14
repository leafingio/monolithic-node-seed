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
	(username, password, done) => {
		User.findOne({ username: username }, function (err, user) {
			/* istanbul ignore if */
			if (err) { return done(err); }

			if (!user) return done('Incorrect username or password');
			user.validPassword(password)
			.then(result => {
				if (result) return done(null, user);
				else done('Incorrect username or password');
			});
		});
	}
));

passport.use('email', new LocalStrategy(
	function (username, password, done) {
		User.findOne({ email: username }, function (err, user) {
			/* istanbul ignore if */
			if (err) return done(err);
			if (!user) return done('Incorrect email or password');
			user.validPassword(password)
			.then(result => {
				if (result) return done(null, user);
				else done('Incorrect email or password');
			});
		});
	}
));

exports.Create = (req, res, next) => {
	if(!req.error){
		var newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		newUser.save(err => {
			/* istanbul ignore if */
			if (err) Boom.badImplementation(req, 'Internal server error', err.errors)
			else{
				req.user = newUser;
				Ok(req, newUser);
			} 
			next();
		});
	} else next();
};

exports.CreateTokens = (req, res, next) => {
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

		Ok(req, data);
		next();
	} else next();
};



