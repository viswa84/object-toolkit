import getter from "get-value";
import hasOwn from "has-own-deep";
import merge from "deepmerge";
import setter from "set-value";
import deleter from "unset-value";
import isEqual from "dequal";
import { Dict, resolvePath } from "./utils";

export function get<T extends Dict>(object: T, path: string, fallback?: any) {
  const paths = resolvePath(path).join(".");
  return getter(object, paths, { default: fallback });
}

export function set<T extends any>(object: T, path: string, value: any): any {
  const paths = resolvePath(path).join(".");
  return setter(object, paths, value);
}

export { merge, isEqual };

export function remove(object: object, path: string) {
  const paths = resolvePath(path).join(".");
  return deleter(object, paths);
}

export function has(object: Dict, path: string) {
  const paths = resolvePath(path).join(".");
  return hasOwn(object, paths);
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
