module.exports = function(app){
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_CORS'] == 'true') {
        var cors = require('cors');
        app.use(cors());
    }
}