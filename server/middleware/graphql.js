module.exports = function(app){
    /* istanbul ignore next */
    if(process.env[process.env.SERVER_ENVIRONMENT + '_FEATURE_GRAPHQL'] == 'true') {
	    var { getSchema } = require('@risingstack/graffiti-mongoose');
        var Post = moduleRequire('Post/schemas');

        app.use(require('@risingstack/graffiti').express({
            schema: getSchema([Post]),
        }));
    };
}