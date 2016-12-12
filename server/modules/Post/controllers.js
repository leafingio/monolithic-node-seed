var Post = require('./schemas');
var { Boom, Ok } = rootRequire('leafing');
var slug = require('slug');

exports.Create = (req, res, next)  => {
  if(!req.error) {
    var newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      url: slug(req.body.title),
      type: req.body.type,
    });
    // Change for pull request
    newPost.save((err) => {
        if (err) Boom.badRequest(req, `${err.name} - ${err.message}`, err.errors);
        else Ok(req, newPost);
        next();
    });
  } else next();
};
