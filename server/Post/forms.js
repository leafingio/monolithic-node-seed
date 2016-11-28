var Joi = require('joi');
var { Boom } = rootRequire('leafing');

var createFormSchema = Joi.object().keys({
    title: Joi.string().min(3).max(50).required(),
    text: Joi.string().min(3).max(50).required(),
});

exports.CreateForm = (req, res, next) => {
  Joi.validate({
    title: req.body.title,
    text: req.body.text,
  }, createFormSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};
