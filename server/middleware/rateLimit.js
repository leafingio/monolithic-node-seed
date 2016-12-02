module.exports = function(app){
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_RATE_LIMIT'] == 'true') {
        var RateLimit = require('express-rate-limit');
        
        var apiLimiter = new RateLimit({
            windowMs: 15*60*1000, // 15 minutes 
            max: 100,
            delayMs: 0 // disabled 
        });
    
        app.use(apiLimiter);
    }
}