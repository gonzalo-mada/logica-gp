"use strict";

var reply = require("../utils/reply");
var loadConfig = require("../utils/loadConfig");


function reload(request, response) {
    loadConfig(require("../../config"), function (data) {
        global.config = data;

        var r = {
            config: require("../../config"),
            newConfig: config,
        };

        // response.json(reply.ok(r));
        response.json(reply.ok());
    });
}

module.exports = {
    reload,
};