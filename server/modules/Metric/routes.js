var router = require('express').Router();

var Forms = require('./forms');
var Controllers = require('./controllers');
var UserControllers = require('../User/controllers');
var UserValidators = require('../User/validators');

module.exports = function () {

	router.post('/', 
		Forms.Create, 
		UserValidators.isToken,
		UserValidators.existsToken,
		Controllers.Create
	);

	return router;
};
