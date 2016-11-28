var js2xmlparser = require('js2xmlparser');

var errGen = (req) => req.error;
var successGen = (req) => req.response;

module.exports = (req, res, data) => {
  switch(req.headers['response-type']){
    case 'application/xml': res.send(js2xmlparser.parse('response', req.error
      ? errGen(req)
      : successGen(req))); break;
    default: res.json(req.error ? errGen(req) : successGen(req)); break;
  }
};
