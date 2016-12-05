var User = require('./schemas');
var validator = require('validator');
var { Boom } = rootRequire('leafing');

exports.UniqueValidator = (req, res, next) => {
	/*
	TODO: find a more efficient way.
	 */
	User.findOne({
    $or: [
      { username: req.body.username },
      { email: req.body.email },
    ],
  }, function(err, user) {
		if (!err) {
			if (user) {
				if (user.username === req.body.username) Boom.conflict(req, 'Username already exists', {})
				if (user.email === req.body.email) Boom.conflict(req, 'Email already exists', {})
			}
		} else Boom.badImplementation(req, 'Internal server error', {});

		next();
	});
};
