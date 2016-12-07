var router = require('express').Router();

var { CreateForm } = require('./forms');
var { CreateController } = require('./controllers');
var { 
	VerifyTokenButContinue,
	CheckTokenButContinue
} = require('../User/controllers');

module.exports = function () {

	router.post('/', 
		VerifyTokenButContinue,
		CheckTokenButContinue,
		CreateForm, 
		CreateController
	);

	return router;
};
