'use strict'

var fs = require("fs");


function readJson(path, callback) {
    callback(JSON.parse(fs.readFileSync(path)));
}


module.exports = {
    readJson
};
