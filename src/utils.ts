export type Dict = Record<string, any>;

export function isObject(value: any): value is object {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

export function isValidObject(value: any): value is object {
  return isObject(value) || Array.isArray(value) || typeof value === "function";
}

export function resolvePath(path: string) {
  return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}
