var express = require('express');
var router = express.Router();
var { UniqueValidator } = require('./validators');
var { CreateForm, LoginForm, RefreshForm } = require('./forms');

var {
  CreateController,
  AuthenticateController,
  SignTokenController,
  VerifyRefreshTokenController,
  LoginController,
  RefreshToken,
  RefreshTokenController,
} = require('./controllers');

module.exports = function () {
    router.post('/signup',
        CreateForm,
        UniqueValidator,
        CreateController
    );

    router.post('/login',
        LoginForm,
        AuthenticateController,
        SignTokenController,
        LoginController
    );

    router.get('/refresh',
        RefreshForm,
        VerifyRefreshTokenController,
        RefreshToken
    );

    return router;
};
