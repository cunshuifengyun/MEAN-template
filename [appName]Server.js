/**
 * Created by DeepBlue on 2015/12/15.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./[appName]-server/config/mongoose'),

    passport = require('./[appName]-server/config/passport'),
    express = require('./[appName]-server/config/express');



try {
    require('fs').mkdirSync('./[appName]-server/log');
} catch (e) {
    if (e.code != 'EEXIST') {
        console.error("Could not set up log directory, error was: ", e);
        process.exit(1);
    }
}

var log4js = require('log4js');
log4js.configure('./[appName]-server/config/log4js.json');
var log = log4js.getLogger('startup');

var db = mongoose();
var passport = passport();
var app = express();


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    log.info('Express server listening on port ', server.address().port, " with pid ", process.pid );
});
module.exports = app;
