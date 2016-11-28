var express = require('express');
var router = express.Router();
var { RequestValidator, UniqueValidator } = require('./validators');
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
        RequestValidator,
        UniqueValidator,
        CreateController
    );

    router.post('/login',
        AuthenticateController,
        SignTokenController,
        LoginController
    );

    router.get('/login/refresh',
      VerifyRefreshTokenController,
      RefreshToken,
      RefreshTokenController
    );

    return router;
};
