"use strict";
exports.__esModule = true;
function isObject(value) {
    var type = typeof value;
    return (value != null &&
        (type === "object" || type === "function") &&
        !Array.isArray(value));
}
exports.isObject = isObject;
