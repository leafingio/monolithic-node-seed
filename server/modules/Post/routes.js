var router = require('express').Router();

var Forms = require('./forms');
var Controllers = require('./controllers');

module.exports = function () {

	router.post('/', 
		Forms.Create,
		Controllers.Create
	);
	router.get('/', function(req,res){
		res.send('hola')
	})

	return router;
};
