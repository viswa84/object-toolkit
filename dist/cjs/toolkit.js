"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var get_value_1 = __importDefault(require("get-value"));
var has_own_deep_1 = __importDefault(require("has-own-deep"));
var deepmerge_1 = __importDefault(require("deepmerge"));
exports.merge = deepmerge_1["default"];
var set_value_1 = __importDefault(require("set-value"));
var unset_value_1 = __importDefault(require("unset-value"));
var utils_1 = require("./utils");
function get(object, path, fallback) {
    var paths = utils_1.resolvePath(path).join(".");
    return get_value_1["default"](object, paths, { "default": fallback });
}
exports.get = get;
function set(object, path, value) {
    var paths = utils_1.resolvePath(path).join(".");
    return set_value_1["default"](object, paths, value);
}
exports.set = set;
function remove(object, path) {
    var paths = utils_1.resolvePath(path).join(".");
    return unset_value_1["default"](object, paths);
}
exports.remove = remove;
function has(object, path) {
    var paths = utils_1.resolvePath(path).join(".");
    return has_own_deep_1["default"](object, paths);
}
exports.has = has;
function map(object, fn) {
    var result = {};
    for (var key in object) {
        var transformed = fn(object[key], key, object);
        result[key] = transformed;
    }
    return result;
}
exports.map = map;
function forEach(object, fn) {
    for (var key in object) {
        fn(object[key], key, object);
    }
}
exports.forEach = forEach;
function filter(object, fn) {
    var result = {};
    for (var key in object) {
        var value = object[key];
        var shouldPass = fn(value, key, object);
        if (shouldPass) {
            result[key] = value;
        }
    }
    return result;
}
exports.filter = filter;
function omit(object, keys) {
    var result = {};
    for (var key in object) {
        var shouldOmit = keys.includes(key);
        if (!shouldOmit) {
            result[key] = object[key];
        }
    }
    return result;
}
exports.omit = omit;
function pick(object, keys) {
    var result = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (key in object) {
            result[key] = object[key];
        }
    }
    return result;
}
exports.pick = pick;
function split(object, keys) {
    var picked = {};
    var omitted = {};
    for (var key in object) {
        if (keys.includes(key)) {
            picked[key] = object[key];
        }
        else {
            omitted[key] = object[key];
        }
    }
    return [picked, omitted];
}
exports.split = split;
function keys(object) {
    return Object.keys(object);
}
exports.keys = keys;
function entries(object) {
    return Object.entries(object);
}
exports.entries = entries;
