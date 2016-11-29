var router = require('express').Router();

var PostRouter = moduleRequire('Post/routes');
var UserRouter = moduleRequire('User/routes');

module.exports = function () {
	router.get('/', function (req, res) {
		res.send('Welcome');
	});

	router.use('/posts', PostRouter());
	router.use('/auth', UserRouter());

	return router;
};
