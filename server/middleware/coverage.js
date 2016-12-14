module.exports = (app) => {
    /* istanbul ignore next */
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_COVERAGE'] == 'true'){ 
        app.use('/coverage', require('express').static('./coverage/lcov-report'));
    }
}