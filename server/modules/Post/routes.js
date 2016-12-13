var router = require('express').Router();

var Forms = require('./forms');
var Validators = require('./validators');
var Controllers = require('./controllers');

module.exports = function () {

	router.post('/', 
		Forms.Create,
		Validators.isUnique,
		Controllers.Create
	);

	return router;
};
