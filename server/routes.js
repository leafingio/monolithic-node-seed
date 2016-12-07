var router = require('express').Router();

var PostRouter = moduleRequire('Post/routes');
var MetricRouter = moduleRequire('Metric/routes');
var UserRouter = moduleRequire('User/routes');

module.exports = function () {

	router.use('/posts', PostRouter());
	router.use('/metrics', MetricRouter());
	router.use('/auth', UserRouter());

	return router;
};
