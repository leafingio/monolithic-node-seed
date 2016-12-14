
exports.Username = (req, res, next) => {
    if(!req.error){
        if(req.body.username) req.body.username = req.body.username.toLowerCase()
        if(req.body.email) req.body.email = req.body.email.toLowerCase();
        next()
    } else next();
}