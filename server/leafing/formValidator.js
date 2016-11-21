var validator = require('validator');

var mess = {
  en: 'Bad request - Parameters error',
  es: 'Bad request - Error de parametros',
};

function errorMessage(req) {
  return req.headers['accept-language']
    ? mess[req.headers['accept-language']]
    : mess['en'];
}

function notEmpty(req, param) {
  return {
    error: param
      ? false
      : true,
    message: 'Required',
  };
}

function isEmail(req, param) {
  if(!req.error && param) {
    return {
      error: validator.isEmail(param)
        ? false
        : true,
      message: 'Must be an email',
    };
  } return false;
}

function length(req, value, key) {
  var range = key.split('_')[1];

}

function constructValidations(req, schema) {
  var list = [];
  var keys = Object.keys(schema);
  for(var x = 0; x < keys.length; x++) {
    var key = keys[x];
    var value = schema[key];
    if(Array.isArray(value)) {
      for(var y = 0; y < value.length; y++) {
        list.push(validate(req, key, value[y]));
      }
    } else list.push(validate(req, key, value));
  };

  return list;
}

var funcs = {
  notEmpty,
  isEmail,
};

function validate(req, field, func) {
  var a = funcs[func.split('_')[0]](req, req.body[field], field);
  if(a.error) {
    req.error = 400;
    req.errorMessage = errorMessage(req);
    a.field = field;
    return a;
  }
}

module.exports = (val) => (req, res, next) => {
	var errorParams = {};
	var validations = constructValidations(req, val);
	for(var a = 0; a < validations.length; a++) {
    var validation = validations[a];
		if(validation) {
			errorParams[validation.field]
        ? errorParams[validation.field] += ', ' + validation.message
        : errorParams[validation.field] = validation.message;
		}
	};

	req.errorData = errorParams;

	next();
};
