module.exports = function(app){
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_GRAPHQL'] == 'true') {
	    var { getSchema } = require('@risingstack/graffiti-mongoose');
        var graffiti = require('@risingstack/graffiti');
        var Post = moduleRequire('Post/schemas');

        app.use(graffiti.express({
            schema: getSchema([Post]),
        }));
    };
}