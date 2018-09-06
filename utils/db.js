const assert = require("assert");
const mongoose = require("mongoose")
const config = require("../config/config");

var _db;
const dataBaseURL = config.dataBaseURL

function initDb() {
    _db = mongoose.connect(dataBaseURL);
    // mongoose.connection.on('error', console.log('Error happened'));
}

function getDb() {
    return _db;
}

module.exports = {
    getDb,
    initDb
};