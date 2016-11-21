var js2xmlparser = require('js2xmlparser');

var errGen = (req) => {
  var err = {
    status_code: req.error,
    message: req.errorMessage,
    data: req.errorData,
  };
  return err;
};

var successGen = (req) => {
  var succ =  {
    status_code: 200,
    message: 'Success',
    data: req.response,
  };
  return succ;
};

module.exports = (req, res, data) => {
  switch(req.headers['response-type']){
    case 'application/xml': res.send(js2xmlparser.parse('response', req.error
      ? errGen(req)
      : successGen(req))); break;
    default: res.json(req.error ? errGen(req) : successGen(req)); break;
  }
};
