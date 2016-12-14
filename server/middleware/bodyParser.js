var bodyParser = require('body-parser');

module.exports = (app) => {    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}