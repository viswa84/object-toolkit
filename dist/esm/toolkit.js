import getter from "get-value";
import hasOwn from "has-own-deep";
import merge from "deepmerge";
import setter from "set-value";
import deleter from "unset-value";
import { resolvePath } from "./utils";
export function get(object, path, fallback) {
    var paths = resolvePath(path).join(".");
    return getter(object, paths, { "default": fallback });
}
export function set(object, path, value) {
    var paths = resolvePath(path).join(".");
    return setter(object, paths, value);
}
export { merge };
export function remove(object, path) {
    var paths = resolvePath(path).join(".");
    return deleter(object, paths);
}
export function has(object, path) {
    var paths = resolvePath(path).join(".");
    return hasOwn(object, paths);
}
export function map(object, fn) {
    var result = {};
    for (var key in object) {
        var transformed = fn(object[key], key, object);
        result[key] = transformed;
    }
    return result;
}
export function forEach(object, fn) {
    for (var key in object) {
        fn(object[key], key, object);
    }
}
export function filter(object, fn) {
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
export function omit(object, keys) {
    var result = {};
    for (var key in object) {
        var shouldOmit = keys.includes(key);
        if (!shouldOmit) {
            result[key] = object[key];
        }
    }
    return result;
}
export function pick(object, keys) {
    var result = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (key in object) {
            result[key] = object[key];
        }
    }
    return result;
}
export function split(object, keys) {
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
export function keys(object) {
    return Object.keys(object);
}
export function entries(object) {
    return Object.entries(object);
}
