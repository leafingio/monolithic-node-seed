var express = require('express');
var router = express.Router();
var path = require("path");

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
