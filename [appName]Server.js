/**
 * Created by DeepBlue on 2015/12/15.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./[appName]-server/config/mongoose'),
    express = require('./[appName]-server/config/express'),
    passport = require('./[appName]-server/config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');