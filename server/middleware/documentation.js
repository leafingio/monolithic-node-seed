module.exports = function(app){
    /* istanbul ignore next */
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_DOCUMENTATION'] == 'true'){ 
        app.use('/docs', require('express').static('./apidoc'));
    }
}