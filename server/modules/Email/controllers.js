
var Email = rootRequire('leafing').Email

exports.Signup = (req, res, next) => {
    if(!req.error){
        var data = {
            to: req.user.email,
            subject: `Welcome ${req.user.username} to Leafing`,
            text: 'Welcome to Leafing',
            html: '<b>Welcome to Leafing </b>'
        }
        Email(data, (err, info) => {
            /* istanbul ignore if */
            if(err) console.log(err)
            else console.log(`Signup email sent from ${info.envelope.from} to ${info.envelope.to}`)
            next();
        })
    } else next()
}