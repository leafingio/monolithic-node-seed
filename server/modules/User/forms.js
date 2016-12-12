var Joi = require('joi');
var { Boom } = rootRequire('leafing');

var createSchema = Joi.object().keys({
    username: Joi.string().min(3).max(50),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email()
}).or('username', 'email');

var authorizationSchema = Joi.object().keys({
    authorizationHeader: Joi.string().required()
})

exports.Create = (req, res, next) => {
  Joi.validate({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, createSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};

exports.Login = (req, res, next) => {
  Joi.validate({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, createSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};

exports.Refresh = (req, res, next) => {
  Joi.validate({
    authorizationHeader: req.header('Authorization'),
  }, authorizationSchema, function (err, value) {
    if(err) Boom.unauthorized(req, err.name, err.details);
    next();
  });
};
