var Joi = require('joi');
var { Boom } = rootRequire('leafing');
Joi.objectId = require('joi-objectid')(Joi);

var createSchema = Joi.object().keys({
    source: Joi.string().min(3).max(50).required(),
    event: Joi.string().min(3).max(50).required(),
    type: Joi.string().min(3).max(50).required(),
    value: Joi.string().min(3).max(50).required(),
    country: Joi.string().min(1).max(50).required(),
    device: Joi.string().min(3).max(50).required(),
    version: Joi.string().min(3).max(50).required() 
});

exports.Create = (req, res, next) => {
  Joi.validate({
      source: req.body.source,
      event: req.body.event,
      type: req.body.type,
      value: req.body.value,
      country: req.body.country,
      device: req.body.device,
      version: req.body.version,
  }, createSchema, function (err, value) {
    if(err) Boom.badRequest(req, err.name, err.details);
    next();
  });
};
