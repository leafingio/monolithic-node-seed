global.rootRequire = function(name) {
	return require(`${__dirname}/${name}`);
};

global.moduleRequire = function(name) {
	return require(`${__dirname}/modules/${name}`);
};

var express = require('express');
var router = require('./routes');
var chalk = require('chalk');
var mongoose = require('mongoose');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var featuresConfig = require('./config/features.config');
var serverConfig = require('./config/server.config');

var dbConfig = require('./config/db.config');
if(mongoose.connection.readyState === 0) {
	mongoose.connect(dbConfig[serverConfig.ENVIRONMENT == 'dev' ? 'test' : 'production'],
	function(err) {
		if (err) console.log(err);
		else console.log(chalk.cyan('- MongoDB', 'Activated:',
			dbConfig[serverConfig.ENVIRONMENT == 'dev' ? 'test' : 'production']));
	});
};

// app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(featuresConfig.LOGS) {
	var logDirectory = __dirname + '/log';

	// ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

	var accessLogStream = FileStreamRotator.getStream({
		date_format: 'YYYYMMDD',
		filename: logDirectory + '/access-%DATE%.log',
		frequency: 'daily',
		verbose: false,
	});

	if(serverConfig.ENVIRONMENT == 'dev') app.use(morgan('dev'));
	else app.use(morgan('combined', { stream: accessLogStream }));
}

if(featuresConfig.API) app.use('/api', router());
if(featuresConfig.DOCUMENTATION) app.use('/docs', express.static(__dirname + '/apidoc'));

var port = 8080;
app.listen(port, function () {
	console.log(chalk.bold.underline.green('Server is now listening at port ', port));
	if(featuresConfig.API) console.log(chalk.cyan('- API', 'Activated'));
	if(featuresConfig.DOCUMENTATION) console.log(chalk.cyan('- Documentation', 'Activated'));
	if(featuresConfig.LOGS) console.log(chalk.cyan('- Logs', 'Activated'));
});
