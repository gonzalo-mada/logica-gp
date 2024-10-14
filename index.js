"use strict";

var app = require("./app");
var infoApp = require("./package.json");

log.log("Esperando 3 segundos antes de iniciar servidor");

var appListen = function () {
    let config = global.config.app;
    app.listen(config.port, function () {
        global.log.log(
            `[${config.NODE_ENV.toUpperCase()}] ${infoApp.name} (v ${
                infoApp.version
            }) funcionando en http://localhost:${config.port}`
        );
    });
};

setTimeout(function () {
    appListen();
}, 3000);