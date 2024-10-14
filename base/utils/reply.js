'use strict'

function ok(value) {
    if (value != undefined && value != null) {
        return createResp("OK", null, value);
    } else {
        return createResp("OK");
    }
}

function error(message) {
    return createResp("ERROR", message, null, "ERROR", "MEDIO");
}

function fatal(message) {
    return createResp("ERROR", message, null, "FATAL", "MEDIO");
}

function createResp(status, message, value, type, level) {
    var resp = { "status": status };

    if (value != undefined && value != null) {
        resp.data = JSON.parse(JSON.stringify(value));
    }

    if (status == "ERROR") {
        resp.error = {
            "type": type,
            "level": level,
            "message": message
        }
    }

    return resp;
}

function throwsError(error) {
    return createResp("ERROR", error.message, null, error.type, error.level);
}


module.exports = {
    ok,
    error,
    fatal,
    throwsError
};
