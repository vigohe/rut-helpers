"use strict";
exports.__esModule = true;
function rutClean(value) {
    return typeof value === 'string' ? value.replace(/[^0-9kK]+/g, '').toUpperCase() : '';
}
exports.rutClean = rutClean;
function hasMoreThanOneCheckDigitK(value) {
    var moreThanOneK = new RegExp(/[kK]{2}/g);
    return moreThanOneK.test(value);
}
exports.hasMoreThanOneCheckDigitK = hasMoreThanOneCheckDigitK;
function rutValidate(value) {
    if (typeof value !== 'string') {
        return false;
    }
    if (hasMoreThanOneCheckDigitK(value)) {
        return false;
    }
    var rut = rutClean(value);
    var rutDigits = parseInt(rut.slice(0, -1), 10);
    var m = 0;
    var s = 1;
    while (rutDigits > 0) {
        s = (s + rutDigits % 10 * (9 - m++ % 6)) % 11;
        rutDigits = Math.floor(rutDigits / 10);
    }
    var checkDigit = (s > 0) ? String((s - 1)) : 'K';
    return (checkDigit === rut.slice(-1));
}
exports.rutValidate = rutValidate;
function rutFormat(value) {
    var rut = rutClean(value);
    if (rut.length <= 1) {
        return rut;
    }
    var result = rut.slice(-4, -1) + "-" + rut.substr(rut.length - 1);
    for (var i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + "." + result;
    }
    return result;
}
exports.rutFormat = rutFormat;
