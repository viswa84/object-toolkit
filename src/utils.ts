export type Dict = Record<string, any>;

/**
 * Returns `true` if the object is a "plain" object
 */
export function isObject(value: any): value is Dict {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Returns `true` if the number of properties in the object is zero.
 */
export function isEmpty(value: any) {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isValidObject(value: any): value is Dict {
  return isObject(value) || Array.isArray(value) || typeof value === "function";
}

/**
 * Converts path string to arrays
 */
export function resolvePath(path: string) {
  return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}
