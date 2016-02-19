/**
 * Created by DeepBlue on 2015/12/15.
 */
var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport'),
    log4js = require('log4js'),
    log = log4js.getLogger('express');
module.exports = function() {

    var app = express();

    if(process.env.NODE_ENV === 'development') {

    }else if(process.env.NODE_ENV === 'production') {
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './[appName]-server/views');
    app.set('view engine', 'ejs');

    app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    //load routes

    app.use(express.static('./[appName]-client/dist'));

    return app;
};