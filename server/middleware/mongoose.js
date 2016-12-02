var chalk = require('chalk');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(){
    if(mongoose.connection.readyState === 0) {
        mongoose.connect(process.env[process.env.SERVER_ENVIRONMENT + '_DB'],
        function(err) {
            /* istanbul ignore next */
            if (err) console.log(err);
            else {
                if(process.env.SERVER_ENVIRONMENT != 'test') {
                    console.log(chalk.cyan('- MongoDB', 'Activated:',
                    process.env[process.env.SERVER_ENVIRONMENT + '_DB']));
                    console.log('\n')
                }
            }
        });
    };
}