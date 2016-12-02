var jwt = require('jsonwebtoken');
var User = require('./schemas');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');

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

			if (!user) return done('Incorrect username');
			user.validPassword(password)
			.then(function (result) {
				if (result) return done(null, user);
				else done('Incorrect password');
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
			if (!user) return done('Incorrect email');
			user.validPassword(password)
			.then(function (result) {
				if (result) return done(null, user);
				else done('Incorrect password');
			}).catch(function (err) {
				return done(err, null);
			});
		});
	}
));

exports.CreateController = (req, res) => {
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
        if(err) res.status(500).send();
        if (user) {
            if(user.email === newUser.email) return res.status(409).send('Email already in use');
            return res.status(409).send('Username already in use');
        } else {
          newUser.save(function(err) {
              if (err) return res.status(500).send();
              res.status(201).json(newUser);
          });
        }
    });
};

 exports.AuthenticateController = (req, res, next) => {
	/*
		A user can authenticate with both email and username.
		The body-field named username can contain both email and a username,
		this explains this somewhat weird setup.
	 */
	if (!req.body.password || !req.body.username) {
		return res.status(422).send('Required parameters empty');
	}

	if (validator.isEmail(req.body.username)) {
		passport.authenticate('email', function (err, user) {
			if (err) return res.status(401).send(err);
			else {
				req.logIn(user, { session: false }, next);
			}
		})(req, res, next);
	} else {
		passport.authenticate('username', function (err, user) {
			if (err) return res.status(401).send(err);
			else {
				req.logIn(user, { session: false }, next);
			}
		})(req, res, next);
	}
};

exports.SignTokenController = (req, res, next) => {
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
};

exports.VerifyRefreshTokenController = (req, res, next) => {
	if(!req.header('Authorization')) return res.status(401).json({ message: 'Missing token' });
	jwt.verify(req.header('Authorization'), process.env.SERVER_SECRET, function (err, verified) {
		if (err) return res.status(401).json({ message: err.message });
		if (verified.type === tokenConstants.TYPES.ACCESS_TOKEN)
      return res.status(401).json({
        message: 'An access token can not be used as an refresh token.',
      });
		else {
			req.verified = verified;
			next();
		}
	});
};

exports.RefreshToken = (req, res, next) => {
	User.findById(req.verified.id, function (err, user) {
		if (err) return res.status(500).send();
		if (!user) return res.status(404).send();
		if (req.verified.userVersion !== user.__v) return res.status(401).send();
		if (user.isBanned) return res.status(401).send();
		req.user = user;
		SignTokenController(req, res, next);
	});
};

exports.LoginController = (req, res) => {
  if (req.user && req.data) return res.status(200).json(req.data);
  else return res.status(500).send();
};

exports.RefreshTokenController = (req, res) => {
  if (req.data) return res.status(200).json(req.data);
  else return res.status(500).json({ message: constants.httpResponseMessages.internalServerError });
};
