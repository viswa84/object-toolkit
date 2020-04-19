export type Dict = Record<string, any>;

export function isObject(value: any): value is Dict {
  const type = typeof value;
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  );
}

// export const isArray = (value: any): value is any[] => Array.isArray(value);

// export const isString = (value: any): value is string =>
//   typeof value === "string";

export function resolvePath(path: string) {
  const output = path.replace("[", ".").replace("]", "");
  return output.split(".");
}
