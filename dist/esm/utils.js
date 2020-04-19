export function isObject(value) {
    var type = typeof value;
    return (value != null &&
        (type === "object" || type === "function") &&
        !Array.isArray(value));
}
