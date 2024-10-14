'use strict'

function getDV(numero) {
    var M = 0, S = 1;
    for (; numero; numero = Math.floor(numero / 10))
        S = (S + numero % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}

module.exports = {
    getDV
};
