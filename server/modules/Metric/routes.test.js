var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var app = rootRequire('server');
var Metric = mongoose.model('Metric');
var User = mongoose.model('User');

var count, token, refreshToken;

describe('- Metrics -', function () {
  describe('POST /metrics', function () {
    describe('Invalid parameters', function () {
      before(function (done) {
        Metric.count(function (err, cnt) {
          count = cnt;
          done()
        })
      });
      it('no source - should respond with errors', function (done) {
        request(app)
            .post('/api/metrics')
            .send({event: 'method'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect(function(res){
                /* istanbul ignore if */
                if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                /* istanbul ignore if */
                if(res.body.data[0].message != '"source" is required' ) throw new Error('Should respond "source" is required')
            })
            .end(done)
      });
      it('no user - should not respond with errors', function (done) {
        request(app)
            .post('/api/metrics')
            .send({source: 'api', event: 'method', type: 'post', value: 'user', })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect(function(res){
                /* istanbul ignore if */
                if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                /* istanbul ignore if */
                if(res.body.data[0].message != '"country" is required' ) throw new Error('Should respond "country" is required')
            })
            .end(done)
      });
      it('no version - should not respond with errors', function (done) {
        request(app)
            .post('/api/metrics')
            .send({source: 'api', event: 'method', type: 'post', value: 'user', country: 'es', device: 'ubuntu'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect(function(res){
                /* istanbul ignore if */
                if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                /* istanbul ignore if */
                if(res.body.data[0].message != '"version" is required' ) throw new Error('Should respond "version" is required')
            })
            .end(done)
      });
      it('should not save the post to the database', function (done) {
        Metric.count(function (err, cnt) {
          count.should.equal(cnt);
          done()
        })
      })
    });

    describe('Valid parameters', function () {
      before(function (done) {
        Metric.count(function (err, cnt) {
          count = cnt;
          done()
        })
      });

      it('should signup', function (done) {
          request(app)
              .post('/api/auth/signup')
              .send({username: 'Test', password: 'pass', email: 'al.parron@gmail.com'})
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect(200)
              .end(done)
      });

      it('should login', function (done) {
          request(app)
              .post('/api/auth/login')
              .send({username: 'Test', password: 'pass'})
              .set('Response-Type', 'application/json')
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect(200)
              .expect(function(res){
                  /* istanbul ignore if */
                  if(!res.body.data.token) throw new Error('Should respond token and refreshToken')
                  else{
                      token = res.body.data.token
                      refreshToken = res.body.data.refreshToken
                  } 
              })
              .end(done)
      });
      it('should respond ok', function (done) {
        request(app)
            .post('/api/metrics')
            .send({source: 'api', event: 'method', type: 'post', value: 'user', country: 'es', device: 'ubuntu', version: '1.0.0'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(done)
      });
      it('should respond ok when authenticated', function (done) {
        request(app)
            .post('/api/metrics')
            .set('Authorization', token)
            .send({source: 'api', event: 'method', type: 'post', value: 'user', country: 'es', device: 'mac', version: '1.0.0'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(done)
      });
      it('should respond error when authenticated with refreshToken', function (done) {
        request(app)
            .post('/api/metrics')
            .set('Authorization', refreshToken)
            .send({source: 'api', event: 'method', type: 'post', value: 'user', country: 'es', device: 'mac', version: '1.0.0'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .end(done)
      });
      it('should respond error when authenticated with bad token', function (done) {
        request(app)
            .post('/api/metrics')
            .set('Authorization', token.split('').reverse().join(''))
            .send({source: 'api', event: 'method', type: 'post', value: 'user', country: 'es', device: 'mac', version: '1.0.0'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .end(done)
      });
      it('should insert two records to the database', function (done) {
        Metric.count(function (err, cnt) {
          cnt.should.equal(count + 2);
          done()
        })
      });
      it('should save the metric to the database', function (done) {
        Metric.findOne({source : 'api'}).exec(function (err, metric) {
          should.not.exist(err);
          metric.should.be.an.instanceOf(Metric);
          metric.event.should.equal('method');
          should.not.exist(metric.user);
          done()
        })
      })
      it('should save the metric to the database', function (done) {
        Metric.findOne({device : 'mac'}).exec(function (err, metric) {
          should.not.exist(err);
          metric.should.be.an.instanceOf(Metric);
          metric.event.should.equal('method');
          should.exist(metric.user);
          done()
        })
      })
    })
  });

  after(function (done) {
    require('async').parallel([
        function (cb) {
            Metric.collection.remove(cb)
        },
        function (cb) {
            User.collection.remove(cb)
        },
    ], done)
  })
});
