"use strict";

const invoker = require("../invokers/invoker.invoker");
const path = require("path");
const fs = require("fs");

function loadDatabases(config, newConfig, cbData) {
    var serverUrl = config.url;

    var usaDB =
        (config.app || {}).usaDatabase && (config.datasources || []).length > 0;

    if (usaDB) {
        invoker.invokeService(
            serverUrl,
            serverUrl.serviceName,
            { name: "database" },
            function (data, error) {
                if (error == null) {
                    newConfig.database = {
                        host: data.host,
                        port: data.port,
                        path: data.path,
                    };

                    var serverDB = newConfig.database;
                    var maxDs = config.datasources.length;
                    var contDs = 0;

                    invoker.invokeService(
                        serverDB,
                        "getConfigDatabase",
                        { name: config.datasources[contDs].name },
                        function callback(data, error) {
                            if (error == null) {
                                var nameDs = "ds_" + data.code;

                                var ds = {};
                                ds.server = data.server;
                                ds.user = data.user;
                                ds.password = data.password;
                                ds.database = data.database;

                                newConfig[nameDs] = ds;

                                if (++contDs != maxDs) {
                                    invoker.invokeService(
                                        serverDB,
                                        "getConfigDatabase",
                                        {
                                            name: config.datasources[contDs]
                                                .name,
                                        },
                                        callback
                                    );
                                }

                                if (contDs == maxDs) {
                                    cbData(newConfig);
                                }
                            } else {
                                log.error(
                                    `ERROR cargando configuración - [Type: ${
                                        error.type
                                    }] - [Level: ${error.level}] [Msg: ${
                                        error.message
                                    }] [Trace: ${
                                        error.trace == undefined
                                            ? ""
                                            : error.trace
                                    }]`
                                );

                                if (++contDs != maxDs) {
                                    invoker.invokeService(
                                        serverDB,
                                        "getConfigDatabase",
                                        {
                                            name: config.datasources[contDs]
                                                .name,
                                        },
                                        callback
                                    );
                                }

                                if (contDs == maxDs) {
                                    cbData(newConfig);
                                }
                            }
                        }
                    );
                } else {
                    log.error(
                        `ERROR cargando configuración - [Type: ${
                            error.type
                        }] - [Level: ${error.level}] [Msg: ${
                            error.message
                        }] [Trace: ${
                            error.trace == undefined ? "" : error.trace
                        }]`
                    );
                    cbData(newConfig);
                }
            }
        );
    } else {
        cbData(newConfig);
    }
}

function loadServices(config, newConfig, cbServ) {
    var serverUrl = config.url;
    var usaServer =
        (config.app || {}).usaServices && (config.services || []).length > 0;

    newConfig.serv_url = config.url;

    if (usaServer) {
        var maxServ = config.services.length;
        var contServ = 0;

        invoker.invokeService(
            serverUrl,
            serverUrl.serviceName,
            { name: config.services[contServ].name },
            function callback(data, error) {
                if (error == null) {
                    var nameServ = "serv_" + data.code;

                    var serv = {};
                    serv.host = data.host;
                    serv.port = data.port;
                    serv.path = data.path;

                    newConfig[nameServ] = serv;

                    if (++contServ != maxServ) {
                        invoker.invokeService(
                            serverUrl,
                            serverUrl.serviceName,
                            { name: config.services[contServ].name },
                            callback
                        );
                    }

                    if (contServ == maxServ) {
                        cbServ(newConfig);
                    }
                } else {
                    log.error(
                        `ERROR cargando configuración - [Type: ${
                            error.type
                        }] - [Level: ${error.level}] [Msg: ${
                            error.message
                        }] [Trace: ${
                            error.trace == undefined ? "" : error.trace
                        }]`
                    );

                    if (++contServ != maxServ) {
                        invoker.invokeService(
                            serverUrl,
                            serverUrl.serviceName,
                            { name: config.services[contServ].name },
                            callback
                        );
                    }

                    if (contServ == maxServ) {
                        cbServ(newConfig);
                    }
                }
            }
        );
    } else {
        cbServ(newConfig);
    }
}

function loadParameters(config, newConfig, cbParam) {
    var serverUrl = config.url;
    var usaParams = (config.params || []).length > 0;

    if (usaParams) {
        invoker.invokeService(
            serverUrl,
            serverUrl.serviceName,
            { name: "param_base" },
            function callback(data, error) {
                if (error == null) {
                    var nameServ = "serv_" + data.code;

                    var serv = {};
                    serv.host = data.host;
                    serv.port = data.port;
                    serv.path = data.path;

                    newConfig[nameServ] = serv;

                    var maxParams = config.params.length;
                    var contParam = 0;

                    var parParams = {
                        app: config.params[contParam].app,
                        params: config.params[contParam].params,
                    };

                    invoker.invokeService(
                        serv,
                        "getParams",
                        parParams,
                        function callback(data, error) {
                            if (error == null) {
                                for (var i = 0; i < data.length; i++) {
                                    var nameParam =
                                        "param_" +
                                        config.params[contParam].app +
                                        "_" +
                                        data[i].code;

                                    newConfig[nameParam] = data[i].value;
                                }

                                if (++contParam != maxParams) {
                                    var parParams = {
                                        app: config.params[contParam].app,
                                        params: config.params[contParam].params,
                                    };

                                    invoker.invokeService(
                                        serv,
                                        "getParams",
                                        parParams,
                                        callback
                                    );
                                }

                                if (contParam == maxParams) {
                                    cbParam(newConfig);
                                }
                            } else {
                                log.error(
                                    `ERROR cargando configuración - [Type: ${
                                        error.type
                                    }] - [Level: ${error.level}] [Msg: ${
                                        error.message
                                    }] [Trace: ${
                                        error.trace == undefined
                                            ? ""
                                            : error.trace
                                    }]`
                                );

                                if (++contParam != maxParams) {
                                    var parParams = {
                                        app: config.params[contParam].app,
                                        params: config.params[contParam].params,
                                    };

                                    invoker.invokeService(
                                        serv,
                                        "getParams",
                                        parParams,
                                        callback
                                    );
                                }

                                if (contParam == maxParams) {
                                    cbParam(newConfig);
                                }
                            }
                        }
                    );
                } else {
                    log.error(
                        `ERROR cargando configuración - [Type: ${
                            error.type
                        }] - [Level: ${error.level}] [Msg: ${
                            error.message
                        }] [Trace: ${
                            error.trace == undefined ? "" : error.trace
                        }]`
                    );
                    cbParam(newConfig);
                }
            }
        );
    } else {
        cbParam(newConfig);
    }
}

function loadCrypter(config, newConfig, cbCryp) {
    var serverUrl = config.url;
    var usaCrypter = !!(config.app || {}).usaCrypter;

    if (usaCrypter) {
        invoker.invokeService(
            serverUrl,
            serverUrl.serviceName,
            { name: "crypter" },
            function callback(data, error) {
                if (error == null) {
                    var nameServ = "serv_" + data.code;

                    var serv = {};
                    serv.host = data.host;
                    serv.port = data.port;
                    serv.path = data.path;

                    newConfig[nameServ] = serv;

                    cbCryp(newConfig);
                } else {
                    log.error(
                        `ERROR cargando configuración - [Type: ${
                            error.type
                        }] - [Level: ${error.level}] [Msg: ${
                            error.message
                        }] [Trace: ${
                            error.trace == undefined ? "" : error.trace
                        }]`
                    );
                    cbCryp(newConfig);
                }
            }
        );
    } else {
        cbCryp(newConfig);
    }
}

function fileCheck(path) {
    try {
        fs.accessSync(path, fs.constants.R_OK);
        return true;
    } catch (e) {
        return false;
    }
}

function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}

function merger(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merger(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return merger(target, ...sources);
}

function mergeDeep(target, sources, callback) {
    let merged = sources ? merger(target, sources) : target;
    callback(merged);
}

function loadConfiguration(config, callback) {
    let envParam = (process.env.NODE_ENV || "").trim();

    let localConfig;
    if (envParam === "") {
        let localPath = path.resolve(__dirname, `../../env/local.js`);
        if (fileCheck(localPath)) localConfig = require(localPath);

        envParam = "development"; //Por defecto
    }

    let envConfig = require(path.resolve(
        __dirname,
        `../../env/${envParam}.js`
    ));

    mergeDeep(envConfig, localConfig, function (envMerged) {
        envConfig = envMerged;
        mergeDeep(config.app, envConfig.app, function (appMerged) {
            let appParam = appMerged;
            appParam.NODE_ENV = envParam;

            var newConfig = {
                app: appParam,
            };

            loadDatabases(envConfig, newConfig, function (dataDatabases) {
                newConfig = dataDatabases;

                loadServices(envConfig, newConfig, function (dataServices) {
                    newConfig = dataServices;

                    loadParameters(
                        envConfig,
                        newConfig,
                        function (dataParameters) {
                            newConfig = dataParameters;

                            loadCrypter(
                                envConfig,
                                newConfig,
                                function (dataCrypter) {
                                    callback(dataCrypter);
                                }
                            );
                        }
                    );
                });
            });
        });
    });
}

module.exports = function (config, callback) {
    log.log("Cargando configuración inicial...");

    loadConfiguration(config, function (data) {
        log.log("Finalizada carga configuración inicial...");
        callback(data);
    });
};