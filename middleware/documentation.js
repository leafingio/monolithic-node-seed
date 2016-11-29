module.exports = function(app){
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_DOCUMENTATION'] == 'true'){ 
        var express = require('express');
        app.use('/docs', express.static(__dirname + '/apidoc'));
    }
}