# Leafing.io API
NodeJS API seed built with great features.

This seed is intended to be a good starter point. My objective is to bring great features that you can
enable or disable and some others that eliminates boilerplate during development.

## Features
* Nodejs REST api
* Nodejs graphql api
* Logs (using Morgan)
* Documentation (using Apidocs and Grunt)
* CRUD examples
* Authentication with email/user and password
* Helmet (Security with headers)
* CORS enabled
* Joi (Post and get parameters validation)
* Boom (Own wrapper for error objects)
* Ok (Success objects)

## Setup

### Required tools
* [Node and npm](http://nodejs.org)
* [MongoDB](http://mongodb.com)
* [Grunt](http://gruntjs.com)

### Installation
0. Clone project `git clone https://github.com/leafingio/api.git`
1. Install node dependencies: `npm install`
2. Run the application: `npm start`
3. Go to [http://localhost:8080/api](http://localhost:8080/api) for REST api
3. Go to [http://localhost:8080/docs](http://localhost:8080/docs) for api documentation

## Project structure
Project structure with pythonic (Django) style. Build modules with their own controllers, routes, permissions, schemas...
If you have any questions about the build or project structure please check out the documentation.

## Support
For any additional information please contact with [Albert Parrón](mailto:al.parron@gmail.com).

## Configuration

### Features
To enable or disable features go to config/features.config.js and change the variables.
When you start the API you will see the log that outputs enabled features

### Environment
To change the environment go to config/server.config.js and change the environment variable.
There are 2 environment setups:
* 'dev'
* (other)
Using dev, the logs will output in the console, otherwise will generate log files inside the log folder. (if
log folder doesn't exist, the api will create it automatically).
Also the environment setup will set the MongoDB url specified inside config/db.config.js

### Documentation
To generate the api documentation you need to run `grunt`. If you want to extend the api documentation, just follow
the way that is generated the sample documentation:
* Go to module
* Create routes.doc.js
* Describe the routes using Apidocs specification.
With this way, you can separate concerns in order to get the code clear and without noise. You can use your own style
because grunt will take care to read all the files to find the documentation specification.

## Leafing features

### Require
I've added two other ways to require libraries inside the project:
* `var { Send } = rootRequire('leafing');``
With this way, you can import the Leafing features that I have added to the project without the '../../../..''
* `var PostRouter = moduleRequire('Post/routes');`
With this other way you can import your modules without the '../../../..' because it goes to read directly to
the modules folder

### Send
The send feature/middleware is built to generate the response after Boom or Ok and next():
```javascript
{
  statusCode: XXX,
  message: 'message X',
  data: {}
}
```
The middleware will know when to send an error or success because we will generate errors inside the request object of
the methods callbacks/middlewares/validators/controllers using `Boom` or `Ok`. It will be explained in the following lines inside the Flow control section

### Flow control
All the middlewares must start with:
```javascript
if(!req.error){  

} else next()
```
and you must put your logic inside the if. That is because if req.error exists (created with Boom), it will go to the next middleware until arrives to the Send middleware. (see Post example)
If you detect some error, you must use `Boom` to generate the error. With this way, the error will go next to the Send middleware and return an error response.
Otherwise, if there's not an error and you want to send data, use `Ok` passing the data and the middleware will create a 200 response code, with a Success message and the data to send.
Feel free to use res.json or res.send and avoid this middleware.

### Response-Type
Using this header, you can receive the response in different ways:
* `application/json` will send json
* `application/xml` will send json parsed to xml

## Work Flow

### Create module
You can add functionality to you API creating a new folder inside modules (for example Post).
It can be separated in:
* controllers.js (where all logic goes)
* routes.js (where all routes goes and decides which controllers-permissions-validations needs).
* schemas.js (where all mongoose schemas goes)
* forms.js (where all parameter validation goes (see Post))
* permissions.js (where all permissions goes)

After that, you can include your routes inside the generic routes.js (./server/routes.js) calling them with the moduleRequire indicating the routes file of the module.

## To be continued...
