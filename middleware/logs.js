module.exports = function(app) {
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_LOGS'] == 'true') {
        var morgan = require('morgan');

        if(process.env.SERVER_ENVIRONMENT == 'dev') app.use(morgan('dev'));
        else {
            var fs = require('fs');

            var logDirectory = './log';

            // ensure log directory exists
            fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

            var accessLogStream = require('file-stream-rotator').getStream({
                date_format: 'YYYYMMDD',
                filename: logDirectory + '/access-%DATE%.log',
                frequency: 'daily',
                verbose: false,
            });
            app.use(morgan('combined', { stream: accessLogStream }));
        }
    }
}