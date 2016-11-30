var router = require('express').Router();

var PostRouter = moduleRequire('Post/routes');
var UserRouter = moduleRequire('User/routes');

module.exports = function () {
	router.get('/', function (req, res) {
		//var get_ip = require('ipware')().get_ip;
		//var ip_info = get_ip(req);
		//console.log(ip_info);

		res.send('Welcome');
	});

	router.use('/posts', PostRouter());
	router.use('/auth', UserRouter());

	return router;
};
