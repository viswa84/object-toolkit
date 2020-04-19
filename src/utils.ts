export type Dict = Record<string, any>;

export function isObject(value: any): value is Dict {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

export function isEmptyObject(value: any) {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isValidObject(value: any): value is Dict {
  return isObject(value) || Array.isArray(value) || typeof value === "function";
}

export function resolvePath(path: string) {
  return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}
