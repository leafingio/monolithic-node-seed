global.rootRequire = function(name) {
	return require(`${__dirname}/${name}`);
};

global.moduleRequire = function(name) {
	return require(`${__dirname}/modules/${name}`);
};

var express = require('express');
var app = express();
var chalk = require('chalk');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var helmet = require('helmet');

if(mongoose.connection.readyState === 0) {
	mongoose.connect(process.env[process.env.SERVER_ENVIRONMENT + '_DB'],
	function(err) {
		if (err) console.log(err);
		else console.log(chalk.cyan('- MongoDB', 'Activated:',
			process.env[process.env.SERVER_ENVIRONMENT + '_DB']));
	});
};

// app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(helmet());
if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_CORS'] == 'true') {
	var cors = require('cors');
	app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_LOGS'] == 'true') {
	var morgan = require('morgan');

	if(process.env.SERVER_ENVIRONMENT == 'dev') app.use(morgan('dev'));
	else {
		var fs = require('fs');
		var FileStreamRotator = require('file-stream-rotator');

		var logDirectory = __dirname + '/log';

		// ensure log directory exists
		fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

		var accessLogStream = FileStreamRotator.getStream({
			date_format: 'YYYYMMDD',
			filename: logDirectory + '/access-%DATE%.log',
			frequency: 'daily',
			verbose: false,
		});
		app.use(morgan('combined', { stream: accessLogStream }));
	}
}

if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_API'] == 'true') {
	var router = require('./routes');
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_SEND_MIDDLEWARE'] == 'true') {
		var { Send } = rootRequire('leafing');
		app.use('/api', router(), Send);
	} else app.use('/api', router());
}

if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_DOCUMENTATION'] == 'true') app.use('/docs', express.static(__dirname + '/apidoc'));

if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_GRAPHQL'] == 'true') {
	var { getSchema } = require('@risingstack/graffiti-mongoose');
	var graffiti = require('@risingstack/graffiti');
	var Post = moduleRequire('Post/schemas');

	app.use(graffiti.express({
		schema: getSchema([Post]),
	}));
};

var port = 8080;
app.listen(port, function () {
	console.log(chalk.bold.underline.green('Server is now listening at port ', port));
	console.log(chalk.cyan.bold('- Environment', process.env.SERVER_ENVIRONMENT));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_API'] == 'true') console.log(chalk.cyan('- API', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_CORS'] == 'true') console.log(chalk.cyan('- CORS', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_API'] == 'true' && process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_SEND_MIDDLEWARE'] == 'true') console.log(chalk.cyan('- Send Middleware', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_GRAPHQL'] == 'true') console.log(chalk.cyan('- GraphQL', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_DOCUMENTATION'] == 'true') console.log(chalk.cyan('- Documentation', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_LOGS'] == 'true') console.log(chalk.cyan('- Logs', 'Activated'));
});
