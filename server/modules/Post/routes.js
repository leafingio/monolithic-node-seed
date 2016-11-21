var express = require('express');
var router = express.Router();

var { FormValidator, Send } = rootRequire('leafing');

var { createForm } = require('./forms');
var { CreateController } = require('./controllers');

module.exports = function () {

	router.post('/',
    FormValidator(createForm),
    CreateController,
    Send);

	return router;
};
