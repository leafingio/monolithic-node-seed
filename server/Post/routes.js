var router = require('express').Router();

var { CreateForm } = require('./forms');
var { CreateController } = require('./controllers');

module.exports = function () {

	router.post('/', CreateForm, CreateController);

	return router;
};
