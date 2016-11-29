global.rootRequire = function(name) {
	return require(`${__dirname}/${name}`);
};

global.moduleRequire = function(name) {
	return require(`${__dirname}/server/${name}`);
};

var app = require('express')();

require('./middleware/mongoose')()

require('./middleware/helmet')(app)
require('./middleware/cors')(app)
require('./middleware/bodyParser')(app)
require('./middleware/logs')(app)
require('./middleware/api')(app)
require('./middleware/documentation')(app)
require('./middleware/graphql')(app)

app.listen(process.env[process.env.SERVER_ENVIRONMENT + '_PORT'], require('./middleware/consoleInit'));