var Joi = require('joi');
var { Boom } = rootRequire('leafing');

var createSchema = Joi.object().keys({
    title: Joi.string().min(3).max(50).required(),
    text: Joi.string().min(3).max(50).required(),
});

exports.Create = (req, res, next) => {
  Joi.validate({
    title: req.body.title,
    text: req.body.text,
  }, createSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};
