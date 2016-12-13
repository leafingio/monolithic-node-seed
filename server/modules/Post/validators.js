
var { Boom, Ok } = rootRequire('leafing');
var passport = require('passport');

var Post = require('./schemas');

exports.isUnique = (req, res, next) => {
	if(!req.error){
		Post.findOne({title: req.body.title}, function(err, post) {
			/* istanbul ignore if */
			if (err) Boom.badImplementation(req, 'Internal server error', {});
			else {
				if (post) {
                    var date = post._id.getTimestamp()
                    var dateNow = new Date()
                    // compare owner too
                    /* istanbul ignore else */
                    if(date.getYear() == dateNow.getYear() && date.getMonth() == dateNow.getMonth() && date.getDate() == dateNow.getDate())
                        Boom.conflict(req, 'Post title cannot be the same as other post of the same day')
				}
			} 
			next();
		});
	} else next();
};