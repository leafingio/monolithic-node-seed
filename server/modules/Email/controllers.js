
var Email = rootRequire('leafing').Email
var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')
var handlebars = require('handlebars');

handlebars.registerPartial('topbar',
    '<h2>Welcome to Leafing</h2>');

exports.Signup = (req, res, next) => {
    if(!req.error){
        var templateDir = path.join(__dirname, 'templates', 'signup')
        var signupTemplate = new EmailTemplate(templateDir)
        var infoTemplate = { 
            user: req.user.email,
            name: req.user.username 
        }

        signupTemplate.render(infoTemplate, function(err, result){
            var emailData = {
                to: req.user.email,
                subject: `Welcome ${req.user.username} to Leafing`,
                text: 'Welcome to Leafing',
                html: result.html
            }
            Email(emailData, (err, info) => {
                /* istanbul ignore if */
                if(err) console.log(err)
                // else console.log(`Signup email sent from ${info.envelope.from} to ${info.envelope.to}`)
                next();
            })
        })
    } else next()
}