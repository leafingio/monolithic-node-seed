var Joi = require('joi');
var { Boom } = rootRequire('leafing');

var createFormSchema = Joi.object().keys({
    username: Joi.string().min(3).max(50),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email()
}).or('username', 'email');

var authorizationFormSchema = Joi.object().keys({
    authorizationHeader: Joi.string().required()
})

exports.CreateForm = (req, res, next) => {
  Joi.validate({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, createFormSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};

exports.LoginForm = (req, res, next) => {
  Joi.validate({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, createFormSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};

exports.RefreshForm = (req, res, next) => {
  Joi.validate({
    authorizationHeader: req.header('Authorization'),
  }, authorizationFormSchema, function (err, value) {
    if(err) Boom.unauthorized(req, err.name, err.details);
    next();
  });
};
