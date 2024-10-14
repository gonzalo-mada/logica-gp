
module.exports = {
    app: {
        port: 2070,
        usaDatabase: true,
        usaServices: false,
        usaCrypter: false,
    },
    url: {
        host: "serviciosbase2.uv.cl",
        port: 80,
        path: "/url",
        serviceName: "getConfigUrl",
    },
    services: [],
    datasources: [
        { "name": "psm" },
        { "name": "postgrado" },
        { "name": "nuevoPostgrado" }
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
    ],
};