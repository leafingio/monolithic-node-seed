var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var app = rootRequire('server');
var User = mongoose.model('User');

var count, token, refreshToken;

describe('- Users -', function () {

    // Singup

    describe('POST /auth/signup', function () {
        describe('Invalid parameters', function () {
            before(function (done) {
                User.count(function (err, cnt) {
                count = cnt;
                done()
                })
            });
            it('no password - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({username: 'Test'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                        if(res.body.data[0].message != '"password" is required' ) throw new Error('Should respond "password" is required')
                    })
                    .end(done)
            });
            it('no email or username - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({password: 'Foobar'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                        if(res.body.data[0].message != '"value" must contain at least one of [username, email]' ) throw new Error('Should respond "value" must contain at least one of [username, email]')
                    })
                    .end(done)
            });

            it('should not save the user to the database', function (done) {
                User.count(function (err, cnt) {
                count.should.equal(cnt);
                done()
                })
            })
        });

        describe('Valid parameters but wrong', function () {
            before(function (done) {
                User.count(function (err, cnt) {
                count = cnt;
                done()
                })
            });
            it('username - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({username: 't', password: 'pass'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                    })
                    .end(done)
            });
            it('email - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({email: 't', password: 'pass'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                    })
                    .end(done)
            });
            it('password - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({username: 'Test', password: 'ajkslhda jkaw'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                    })
                    .end(done)
            });
            it('should not save the user to the database', function (done) {
                User.count(function (err, cnt) {
                count.should.equal(cnt);
                done()
                })
            })
        });

        describe('Valid parameters', function () {
            before(function (done) {
                User.count(function (err, cnt) {
                count = cnt;
                done()
                })
            });
            it('should respond ok', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({username: 'Test', password: 'pass', email: 'al.parron@gmail.com'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
                    .end(done)
            });
            it('should insert a record to the database', function (done) {
                User.count(function (err, cnt) {
                cnt.should.equal(count + 1);
                done()
                })
            });
            it('should save the user to the database', function (done) {
                User.findOne({username : 'Test'}).exec(function (err, user) {
                should.not.exist(err);
                user.should.be.an.instanceOf(User);
                user.username.should.equal('Test');
                done()
                })
            })
        })

        describe('Valid parameters but duplicated', function () {
            before(function (done) {
                User.count(function (err, cnt) {
                count = cnt;
                done()
                })
            });
            it('should respond conflict', function (done) {
                request(app)
                    .post('/api/auth/signup')
                    .send({username: 'Test', password: 'pass'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(409)
                    .end(done)
            });
            it('should not insert a record to the database', function (done) {
                User.count(function (err, cnt) {
                cnt.should.equal(count);
                done()
                })
            });
        })
    });

    // Login

    describe('POST /auth/login', function () {
        describe('Invalid parameters', function () {
            it('no password - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({username: 'Test'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                        if(res.body.data[0].message != '"password" is required' ) throw new Error('Should respond "password" is required')
                    })
                    .end(done)
            });
            it('no email or username - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({password: 'Foobar'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                        if(res.body.data[0].message != '"value" must contain at least one of [username, email]' ) throw new Error('Should respond "value" must contain at least one of [username, email]')
                    })
                    .end(done)
            });
        });
        
        describe('Valid parameters but wrong', function () {
            it('username - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({username: 'Testa', password: 'pass'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(401)
                    .expect(function(res){
                        if(res.body.data != 'Incorrect username or password' ) throw new Error('Should respond Incorrect username or password')
                    })
                    .end(done)
            });
            it('email - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({username: 'al.parron@gmaill.com', password: 'pass'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(401)
                    .expect(function(res){
                        if(res.body.data != 'Incorrect email or password' ) throw new Error('Should respond Incorrect email or password')
                    })
                    .end(done)
            });
            it('password - should respond with errors', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({username: 'Test', password: 'passs'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(401)
                    .expect(function(res){
                        if(res.body.data != 'Incorrect username or password' ) throw new Error('Should respond Incorrect username or password')
                    })
                    .end(done)
            }); 
        });

        describe('Valid parameters', function () {
            it('should respond ok', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({username: 'Test', password: 'pass'})
                    .set('Response-Type', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
                    .expect(function(res){
                        if(!res.body.data.token) throw new Error('Should respond token and refreshToken')
                        else{
                            token = res.body.data.token
                            refreshToken = res.body.data.refreshToken
                        } 
                    })
                    .end(done)
            });
        });

        describe('Valid parameters', function () {
            it('should respond ok', function (done) {
                request(app)
                    .post('/api/auth/login')
                    .send({username: 'Test', password: 'pass'})
                    .set('Response-Type', 'application/xml')
                    .expect('Content-Type', 'text/html; charset=utf-8')
                    .expect(200)
                    .end(done)
            });
        });
    });

    // Refresh token

    describe('POST /auth/refresh', function () {
        describe('Invalid parameters', function () {
            it('no Authorization header - should respond with errors', function (done) {
                request(app)
                    .get('/api/auth/refresh')
                    .send({username: 'Test'})
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(401)
                    .expect(function(res){
                        if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                        if(res.body.data[0].message != '"authorizationHeader" is required' ) throw new Error('Should respond "authorizationHeader" is required')
                    })
                    .end(done)
            });
        });
        
        describe('Valid parameters but wrong', function () {
            it('authorization header - should respond with errors', function (done) {
                request(app)
                    .get('/api/auth/refresh')
                    .set('Authorization', 'badtoken')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(401)
                    .expect(function(res){
                        if(res.body.message != 'jwt malformed' ) throw new Error('Should respond jwt malformed')
                    })
                    .end(done)
            });
            it('should respond bad access token', function (done) {
                request(app)
                    .get('/api/auth/refresh')
                    .set('Authorization', token)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(401)
                    .expect(function(res){
                        if(res.body.message != 'An access token can not be used as an refresh token' ) throw new Error('Should respond An access token can not be used as an refresh token.')
                    })
                    .end(done)
            });
        });

        // describe('Valid parameters', function () {
        //     it('should respond ok', function (done) {
        //         request(app)
        //             .get('/api/auth/refresh')
        //             .set('Authorization', refreshToken)
        //             .expect('Content-Type', 'application/json; charset=utf-8')
        //             .expect(200)
        //             .expect(function(res){
        //                 if(res.body.message != 'An access token can not be used as an refresh token' ) throw new Error('Should respond An access token can not be used as an refresh token.')
        //             })
        //             .end(done)
        //     });
        // });
    });

    after(function (done) {
        require('async').parallel([
            function (cb) {
                User.collection.remove(cb)
            },
        ], done)
    })
});
