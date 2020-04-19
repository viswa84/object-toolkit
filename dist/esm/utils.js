export function isObject(value) {
    return value != null && typeof value === "object" && !Array.isArray(value);
}
export function isValidObject(value) {
    return isObject(value) || Array.isArray(value) || typeof value === "function";
}
export function resolvePath(path) {
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}
