module.exports = (app) => {
    var { Send } = rootRequire('leafing');
    var { Boom, Ok } = rootRequire('leafing');

    app.use((req, res, next) => {
        Boom.notFound(req, 'Method not found')
        next()
    }, Send);
}