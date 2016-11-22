var Send = require('./send');

function createError(req, statusCode, error, message, data) {
  req.error = {
    statusCode,
    error,
    message,
    data: data || {},
  };
}

exports.badRequest = (req, message, data) => createError(req, 400, 'Bad Request', message, data);
exports.unauthorized = (req, message, data) => createError(req, 401, 'Unauthorized', message, data);
exports.paymentRequired = (req, message, data) => createError(req, 402, 'Payment Required', message, data);
exports.forbidden = (req, message, data) => createError(req, 403, 'Forbidden', message, data);
exports.notFound = (req, message, data) => createError(req, 404, 'Not Found', message, data);
exports.methodNotAllowed = (req, message, data) => createError(req, 405, 'Method Not Allowed', message, data);
exports.notAcceptable = (req, message, data) => createError(req, 406, 'Not Acceptable', message, data);
exports.proxyAuthRequired = (req, message, data) => createError(req, 407, 'Proxy Authentication Required', message, data);
exports.clientTimeout = (req, message, data) => createError(req, 408, 'Request Time-out', message, data);
exports.conflict = (req, message, data) => createError(req, 409, 'Conflict', message, data);
exports.resourceGone = (req, message, data) => createError(req, 410, 'Gone', message, data);
exports.lengthRequired = (req, message, data) => createError(req, 411, 'Length Required', message, data);
exports.preconditionFailed = (req, message, data) => createError(req, 412, 'Precondition Failed', message, data);
exports.entityTooLarge = (req, message, data) => createError(req, 413, 'Request Entity Too Large', message, data);
exports.uriTooLong = (req, message, data) => createError(req, 414, 'Request-URI Too Large', message, data);
exports.unsupportedMediaType = (req, message, data) => createError(req, 415, 'Unsupported Media Type', message, data);
exports.rangeNotSatisfiable = (req, message, data) => createError(req, 416, 'Requested Range Not Satisfiable', message, data);
exports.expectationFailed = (req, message, data) => createError(req, 417, 'Expectation Failed', message, data);
exports.badData = (req, message, data) => createError(req, 422, 'Unprocessable Entity', message, data);
exports.locked = (req, message, data) => createError(req, 423, 'Locked', message, data);
exports.preconditionRequired = (req, message, data) => createError(req, 428, 'Precondition Required', message, data);
exports.tooManyRequests = (req, message, data) => createError(req, 429, 'Too Many Requests', message, data);
exports.illegal = (req, message, data) => createError(req, 451, 'Unavailable For Legal Reasons', message, data);
exports.badImplementation = (req, message, data) => createError(req, 500, 'Internal Server Error', message, data);
exports.notImplemented = (req, message, data) => createError(req, 501, 'Not Implemented', message, data);
exports.badGateway = (req, message, data) => createError(req, 502, 'Bad Gateway', message, data);
exports.serverUnavailable = (req, message, data) => createError(req, 503, 'Service Unavailable', message, data);
exports.gatewayTimeout = (req, message, data) => createError(req, 504, 'Gateway Time-out', message, data);
