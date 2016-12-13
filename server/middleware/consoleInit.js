var chalk = require('chalk');

/* istanbul ignore next */
module.exports = function () {
	console.log(chalk.bold.underline.green('Server is now listening at port ', process.env[process.env.SERVER_ENVIRONMENT + '_PORT']));
	console.log(chalk.cyan.bold('- Environment', process.env.SERVER_ENVIRONMENT));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_API'] == 'true') console.log(chalk.cyan('- API', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_CORS'] == 'true') console.log(chalk.cyan('- CORS', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_RATE_LIMIT'] == 'true') console.log(chalk.cyan('- Rate limit', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_API'] == 'true' && process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_SEND_MIDDLEWARE'] == 'true') console.log(chalk.cyan('- Send Middleware', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_GRAPHQL'] == 'true') console.log(chalk.cyan('- GraphQL', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_DOCUMENTATION'] == 'true') console.log(chalk.cyan('- Documentation', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_COVERAGE'] == 'true') console.log(chalk.cyan('- Coverage', 'Activated'));
	if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_LOGS'] == 'true') console.log(chalk.cyan('- Logs', 'Activated'));
}