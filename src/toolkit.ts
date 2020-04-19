import objectAssign from "object-assign";
import { Dict, isObject, resolvePath } from "./utils";

export function get<T extends Dict>(object: T, path: string, fallback?: any) {
  const pathArray = resolvePath(path);

  for (let index = 0; index < pathArray.length; index++) {
    const path = pathArray[index] as keyof T;
    //@ts-ignore
    object = object ? object[path] : undefined;
  }

  return object === undefined ? fallback : object;
}

export function set(object: any, path: string, value: any): any {
  if (!isObject(object)) return object;

  const pathArray = resolvePath(path);

  if (pathArray.length === 1) {
    object[path] = value;
    return object;
  }

  for (let index = 0; index < pathArray.length; index++) {
    const path = pathArray[index];

    if (!isObject(object[path])) {
      object[path] = {};
    }

    if (index === pathArray.length - 1) {
      object[path] = value;
      break;
    }

    object = object[path];
  }
}

export function merge(...objects: any[]) {
  let result: Dict = {};
  for (const object of objects) {
    result = objectAssign({}, result, object);
  }
  return result;
}

export function remove(object: object, path: string) {
  if (!isObject(object) || typeof path !== "string") {
    return;
  }

  const pathArray = resolvePath(path);

  for (let index = 0; index < pathArray.length; index++) {
    const path = pathArray[index] as keyof typeof object;

    if (index === pathArray.length - 1) {
      delete object[path];
      return;
    }

    object = object[path];
  }
}

export function has(object: object, path: string) {
  if (!isObject(object) || typeof path !== "string") {
    return false;
  }

  const pathArray = resolvePath(path);

  if (pathArray.length === 0) {
    return false;
  }

  for (let index = 0; index < pathArray.length; index++) {
    const path = pathArray[index];

    if (!(path in object)) {
      return false;
    }

    if (isObject(object)) {
      object = object[path];
    }
  }

  return true;
}

export type MapInterator<T> = (value: any, key: string, object: T) => void;

export function map<T extends Dict>(object: T, fn: MapInterator<T>) {
  const result: Dict = {};

  for (const key in object) {
    const transformed = fn(object[key], key, object);
    result[key] = transformed;
  }

  return result;
}

export type ForEachInterator<T> = (value: any, key: string, object: T) => void;

export function forEach<T extends Dict>(object: T, fn: ForEachInterator<T>) {
  for (const key in object) {
    fn(object[key], key, object);
  }
}

export type FilterInterator<T> = (
  value: any,
  key: string,
  object: T
) => boolean;

export function filter<T extends Dict>(object: T, fn: FilterInterator<T>) {
  const result: Dict = {};

  for (const key in object) {
    const value = object[key];
    const shouldPass = fn(value, key, object);

    if (shouldPass) {
      result[key] = value;
    }
  }

  return result;
}

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result: Dict = {};

  for (const key in object) {
    const shouldOmit = keys.includes(key as T[K]);
    if (!shouldOmit) {
      result[key] = object[key];
    }
  }

  return result as Omit<T, K>;
}

export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result = {} as { [P in K]: T[P] };
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

export function split<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const picked: Dict = {};
  const omitted: Dict = {};

  for (const key in object) {
    if (keys.includes(key as T[K])) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  }

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
}

export function keys<T>(object: T) {
  return (Object.keys(object) as unknown) as (keyof T)[];
}

export function entries<T>(object: T) {
  return Object.entries(object) as [keyof T, T[keyof T]][];
}
