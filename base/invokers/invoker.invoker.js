"use strict";

var http = require("http");
var reply = require("../utils/reply");

var headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
};

function getOptions(dataServ, serviceName) {
    var options = {
        host: dataServ.host,
        port: dataServ.port,
        path: `${dataServ.path}/${serviceName}`,
        method: "POST",
        headers: headers,
    };

    return options;
}

function invokeService(dataServ, serviceName, params, callback) {
    try {
        var op = getOptions(dataServ, serviceName);

        var req = http.request(op, function (res) {
            var finalData = "";

            res.on("data", function (data) {
                finalData += data.toString();
            });

            res.on("end", function () {
                try {
                    var result = JSON.parse(finalData);

                    if (result.status == "OK") {
                        callback(
                            result.hasOwnProperty("data") ||
                                result.data != undefined
                                ? result.data
                                : null,
                            null
                        );
                    } else {
                        if (result.error.type == "FATAL") {
                            log.log(
                                `ERROR Fatal: ${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${result.error.message}`,
                                result.error
                            );
                        }
                        callback(null, result.error);
                    }
                } catch (error) {
                    log.log(
                        `ERROR Parse: ${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${error.message}`,
                        error
                    );
                    log.log(finalData);
                    callback(
                        null,
                        reply.fatal(
                            `${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${error.message}`
                        ).error
                    );
                }
            });
        });

        req.write(
            "arg=" +
                (params == null
                    ? encodeURIComponent(JSON.stringify({}))
                    : encodeURIComponent(JSON.stringify(params)))
        );

        req.on("error", function (error) {
            log.log(
                `ERROR Request: ${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${error.message}`,
                error
            );
            callback(
                null,
                reply.fatal(
                    `${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${error.message}`
                ).error
            );
        });

        req.end();
    } catch (error) {
        log.log(
            `ERROR No controlado: ${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${error.message}`,
            error
        );
        callback(
            null,
            reply.fatal(
                `${dataServ.host}:${dataServ.port}${dataServ.path}/${serviceName}: ${error.message}`
            ).error
        );
    }
}

module.exports = {
    invokeService,
};