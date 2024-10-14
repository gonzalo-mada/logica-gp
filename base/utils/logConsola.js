"use strict";

var dateFormat = require("dateformat");

function getDataFormat() {
    return dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");
}

function log(msg, ...moreMsg) {
    if (moreMsg != undefined && moreMsg.length > 0) {
        console.log(getDataFormat(), msg, ...moreMsg);
    } else {
        console.log(getDataFormat(), msg);
    }
}

function error(msg, ...moreMsg) {
    if (moreMsg != undefined && moreMsg.length > 0) {
        console.error(getDataFormat(), msg, ...moreMsg);
    } else {
        console.error(getDataFormat(), msg);
    }
}

module.exports = {
    log,
    error,
};