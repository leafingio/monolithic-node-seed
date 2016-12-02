var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var app = rootRequire('server');
var Post = mongoose.model('Post');

var count;

describe('- Posts -', function () {
  describe('POST /posts', function () {
    describe('Invalid parameters', function () {
      before(function (done) {
        Post.count(function (err, cnt) {
          count = cnt;
          done()
        })
      });

      it('no title - should respond with errors', function (done) {
        request(app)
            .post('/api/posts')
            .send({text: 'Foo bar'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect(function(res){
                if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                if(res.body.data[0].message != '"title" is required' ) throw new Error('Should respond "title" is required')
            })
            .end(done)
      });
      it('no text - should respond with errors', function (done) {
        request(app)
            .post('/api/posts')
            .send({title: 'Foo bar'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect(function(res){
                if(res.body.message != 'ValidationError') throw new Error("Should respond ValidationError");
                if(res.body.data[0].message != '"text" is required' ) throw new Error('Should respond "text" is required')
            })
            .end(done)
      });

      it('should not save the post to the database', function (done) {
        Post.count(function (err, cnt) {
          count.should.equal(cnt);
          done()
        })
      })
    });

    describe('Valid parameters', function () {
      before(function (done) {
        Post.count(function (err, cnt) {
          count = cnt;
          done()
        })
      });

      it('should respond ok', function (done) {
        request(app)
            .post('/api/posts')
            .send({title: 'Titulo', text: 'Texto'})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(done)
      });

      it('should insert a record to the database', function (done) {
        Post.count(function (err, cnt) {
          cnt.should.equal(count + 1);
          done()
        })
      });

      it('should save the post to the database', function (done) {
        Post.findOne({title : 'Titulo'}).exec(function (err, post) {
          should.not.exist(err);
          post.should.be.an.instanceOf(Post);
          post.text.should.equal('Texto');
          done()
        })
      })
    })
  });

  after(function (done) {
    require('async').parallel([
        function (cb) {
            Post.collection.remove(cb)
        },
        // function (cb) {
        //     Post.collection.remove(cb)
        // }
    ], done)
  })
});
