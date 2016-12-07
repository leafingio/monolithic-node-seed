var Metric = require('./schemas');
var { Boom, Ok } = rootRequire('leafing');

exports.CreateController = (req, res, next)  => {
  if(!req.error) {
    var newMetric = new Metric({
      source: req.body.source,
      event: req.body.event,
      type: req.body.type,
      value: req.body.value,
      user: req.user,
      country: req.body.country,
      device: req.body.device,
      version: req.body.version
    });

    newMetric.save((err) => {
        if (err) Boom.badRequest(req, `${err.name} - ${err.message}`, err.errors);
        else Ok(req, newMetric);
        next();
    });
  } else next();
};
