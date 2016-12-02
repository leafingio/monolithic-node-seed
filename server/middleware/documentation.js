module.exports = function(app){
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_DOCUMENTATION'] == 'true'){ 
        app.use('/docs', require('express').static(__dirname + '../../apidoc'));
    }
}