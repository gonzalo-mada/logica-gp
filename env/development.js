"use strict";

module.exports = {
    app: {
        port: 2070,
        usaDatabase: true,
        usaServices: false,
        usaCrypter: false,
    },
    url: {
        host: "10.50.100.201",
        port: 80,
        path: "/url",
        serviceName: "getConfigUrl",
    },
    datasources: [
        { "name": "psmTest" },
        { "name": "postgradoTest" },
        { "name": "nuevoPostgradoTest" }
    ],
    params: [
        {
            app: "base",
            params: [
                { code: "url_logout" },
                { code: "mail_to" },
                { code: "mail_from" },
            ],
        },
        {
            app: "app",
            params: [{ code: "puerto" }],
        },
    ],
};