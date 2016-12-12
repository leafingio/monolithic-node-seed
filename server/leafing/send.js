var js2xmlparser = require('js2xmlparser');

var errGen = (req) => req.error;
var successGen = (req) => req.response;
var Boom = require('./boom');

module.exports = (req, res, data) => {
  if(!req.error && !req.response) Boom.notFound(req, 'Method not found')
  switch(req.headers['response-type']){
    case 'application/xml': res.status(req.error ? req.error.statusCode : 200).send(js2xmlparser.parse('response', req.error
      ? errGen(req)
      : successGen(req))); break;
    default: res.status(req.error ? req.error.statusCode : 200).json(req.error ? errGen(req) : successGen(req)); break;
  }
};
