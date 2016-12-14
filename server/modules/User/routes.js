var express = require('express');
var router = express.Router();

var Validators = require('./validators');
var Forms = require('./forms');
var Controllers = require('./controllers');
var EmailControllers = moduleRequire('Email/controllers');

module.exports = () => {
    router.post('/signup',
        Forms.Create,
        Validators.isUnique,
        Controllers.Create,
        EmailControllers.Signup
    );

    router.post('/login',
        Forms.Login,
        Validators.Authenticate,
        Controllers.CreateTokens
    );

    router.get('/refresh',
        Forms.Refresh,
        Validators.isRefreshToken,
        Validators.existsToken,
        Controllers.CreateTokens
    );

    return router;
};
