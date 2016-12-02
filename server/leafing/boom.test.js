var expect = require('chai').expect;
var boom = require('./boom');

describe('Boom', function () {
    it('bad request', function (done) {
        var req = {}
        boom.badRequest(req, '', '');
        expect(req.error.statusCode).to.be.equal(400);
        done()
    });
    it('unauthorized', function (done) {
        var req = {}
        boom.unauthorized(req, '', '');
        expect(req.error.statusCode).to.be.equal(401);
        done()
    });
    it('payment required', function (done) {
        var req = {}
        boom.paymentRequired(req, '', '');
        expect(req.error.statusCode).to.be.equal(402);
        done()
    });
    it('forbidden', function (done) {
        var req = {}
        boom.forbidden(req, '', '');
        expect(req.error.statusCode).to.be.equal(403);
        done()
    });
    it('not found', function (done) {
        var req = {}
        boom.notFound(req, '', '');
        expect(req.error.statusCode).to.be.equal(404);
        done()
    });
    it('method not allowed', function (done) {
        var req = {}
        boom.methodNotAllowed(req, '', '');
        expect(req.error.statusCode).to.be.equal(405);
        done()
    });
    it('not acceptable', function (done) {
        var req = {}
        boom.notAcceptable(req, '', '');
        expect(req.error.statusCode).to.be.equal(406);
        done()
    });
    it('proxy auth required', function (done) {
        var req = {}
        boom.proxyAuthRequired(req, '', '');
        expect(req.error.statusCode).to.be.equal(407);
        done()
    });
    it('client timeout', function (done) {
        var req = {}
        boom.clientTimeout(req, '', '');
        expect(req.error.statusCode).to.be.equal(408);
        done()
    });
    it('conflict', function (done) {
        var req = {}
        boom.conflict(req, '', '');
        expect(req.error.statusCode).to.be.equal(409);
        done()
    });
    it('resource gone', function (done) {
        var req = {}
        boom.resourceGone(req, '', '');
        expect(req.error.statusCode).to.be.equal(410);
        done()
    });
    it('length required', function (done) {
        var req = {}
        boom.lengthRequired(req, '', '');
        expect(req.error.statusCode).to.be.equal(411);
        done()
    });
    it('precondition failed', function (done) {
        var req = {}
        boom.preconditionFailed(req, '', '');
        expect(req.error.statusCode).to.be.equal(412);
        done()
    });
    it('entity too large', function (done) {
        var req = {}
        boom.entityTooLarge(req, '', '');
        expect(req.error.statusCode).to.be.equal(413);
        done()
    });
    it('uri too long', function (done) {
        var req = {}
        boom.uriTooLong(req, '', '');
        expect(req.error.statusCode).to.be.equal(414);
        done()
    });
    it('unsupported media type', function (done) {
        var req = {}
        boom.unsupportedMediaType(req, '', '');
        expect(req.error.statusCode).to.be.equal(415);
        done()
    });
    it('range not satisfiable', function (done) {
        var req = {}
        boom.rangeNotSatisfiable(req, '', '');
        expect(req.error.statusCode).to.be.equal(416);
        done()
    });
    it('expectation failed', function (done) {
        var req = {}
        boom.expectationFailed(req, '', '');
        expect(req.error.statusCode).to.be.equal(417);
        done()
    });
    it('bad data', function (done) {
        var req = {}
        boom.badData(req, '', '');
        expect(req.error.statusCode).to.be.equal(422);
        done()
    });
    it('locked', function (done) {
        var req = {}
        boom.locked(req, '', '');
        expect(req.error.statusCode).to.be.equal(423);
        done()
    });
    it('precondition required', function (done) {
        var req = {}
        boom.preconditionRequired(req, '', '');
        expect(req.error.statusCode).to.be.equal(428);
        done()
    });
    it('too many requests', function (done) {
        var req = {}
        boom.tooManyRequests(req, '', '');
        expect(req.error.statusCode).to.be.equal(429);
        done()
    });
    it('illegal', function (done) {
        var req = {}
        boom.illegal(req, '', '');
        expect(req.error.statusCode).to.be.equal(451);
        done()
    });
    it('bad implementation', function (done) {
        var req = {}
        boom.badImplementation(req, '', '');
        expect(req.error.statusCode).to.be.equal(500);
        done()
    });
    it('not implemented', function (done) {
        var req = {}
        boom.notImplemented(req, '', '');
        expect(req.error.statusCode).to.be.equal(501);
        done()
    });
    it('bad gateway', function (done) {
        var req = {}
        boom.badGateway(req, '', '');
        expect(req.error.statusCode).to.be.equal(502);
        done()
    });
    it('server unavailable', function (done) {
        var req = {}
        boom.serverUnavailable(req, '', '');
        expect(req.error.statusCode).to.be.equal(503);
        done()
    });
    it('gateway timeout', function (done) {
        var req = {}
        boom.gatewayTimeout(req, '', '');
        expect(req.error.statusCode).to.be.equal(504);
        done()
    });
});
