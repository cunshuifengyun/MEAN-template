/**
 * Created by DeepBlue on 2015/12/15.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    //load models

    return db;
};