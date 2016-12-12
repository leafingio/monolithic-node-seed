module.exports = function(app){
    /* istanbul ignore next */
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_CORS'] == 'true') {
        app.use(require('cors')());
    }
}