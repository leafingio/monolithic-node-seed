var Post = require('./schemas');
var { Boom, Ok } = rootRequire('leafing');

exports.CreateController = (req, res, next)  => {
  if(!req.error) {
    var newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      url: req.body.url,
      type: req.body.type,
    });

    newPost.save(function(err) {
        if (err) Boom.badRequest(req, `${err.name} - ${err.message}`, err.errors);
        else Ok(req, newPost);
        next();
    });
  } else next();
};
