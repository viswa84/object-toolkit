"use strict";
exports.__esModule = true;
function isObject(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
}
exports.isObject = isObject;
function isValidObject(value) {
    return isObject(value) || Array.isArray(value) || typeof value === "function";
}
exports.isValidObject = isValidObject;
function resolvePath(path) {
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}
exports.resolvePath = resolvePath;
