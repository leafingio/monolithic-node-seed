var User = require('./schemas');
var validator = require('validator');

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
		if (err) return res.status(500).json({ message: 'Internal server error' });
		if (user) {
			if (user.username === req.body.username)
        return res.status(409).json({ message: 'Username already exists' });
			if (user.email === req.body.email)
        return res.status(409).json({ message: 'Email already exists' });
		}

		next();
	});
};

exports.RequestValidator = (req, res, next) => {
	if (!req.body.username || !req.body.email || !req.body.password) {
		res.status(400);
		return res.json({ message: 'Invalid request parameters' });
	}

	if (!validator.isEmail(req.body.email)) {
		res.status(400);
		return res.json({ message: 'The email field must contain a valid email address' });
	}

	next();
};
