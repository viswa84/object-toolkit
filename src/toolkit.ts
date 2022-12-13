import getter from "get-value";
import hasOwn from "has-own-deep";
import merge from "deepmerge";
import setter from "set-value";
import deleter from "unset-value";
import isEqual from "dequal";
import renamer from "deep-rename-keys";
import { Dict, resolvePath } from "./utils";
import copy from "deep-copy";
import axios from "axios"

export type RenameKeysFn = (key: string) => string;

/**
 * Recursively rename the keys in an object.
 */
export function renameKeys<T extends Dict>(object: T, fn: RenameKeysFn) {
  return renamer(object, fn);
}

/**
 * Get object value based on string path
 */
export function get<T extends Dict>(object: T, path: string, fallback?: any) {
  const paths = resolvePath(path).join(".");
  return getter(object, paths, { default: fallback });
}

/**
 * Set object value based on string path
 */
export function set<T extends any>(object: T, path: string, value: any): any {
  const paths = resolvePath(path).join(".");
  return setter(object, paths, value);
}

/**
 * Delete object value based on string path
 */
export function remove(object: object, path: string) {
  const paths = resolvePath(path).join(".");
  return deleter(object, paths);
}

/**
 * Check if an object has specific key based on path
 */
export function has(object: Dict, path: string) {
  const paths = resolvePath(path).join(".");
  return hasOwn(object, paths);
}

export type MapFn<T> = (value: any, key: string, object: T) => void;

/**
 * A function that maps over each key-value pair in the object.
 *
 * It calls the defined function on each item of an object,
 * and returns an object that contains the results.
 *
 * @param object the object to map
 * @param fn the callback to run
 */
export function map<T extends Dict>(object: T, fn: MapFn<T>) {
  const result: Dict = {};

  for (const key in object) {
    const transformed = fn(object[key], key, object);
    result[key] = transformed;
  }

  return result;
}

export type ForEachFn<T> = (value: any, key: string, object: T) => void;

/**
 * Performs the specified action for each element in an object.
 *
 * @param object the object to loop through
 * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the object.
 */
export function forEach<T extends Dict>(object: T, fn: ForEachFn<T>) {
  for (const key in object) {
    fn(object[key], key, object);
  }
}

export type FilterFn<T> = (value: any, key: string, object: T) => boolean;

/**
 * Returns the items of an object that meet the condition specified in a callback function.
 *
 * @param object the object to loop through
 * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the object.
 */
export function filter<T extends Dict>(object: T, fn: FilterFn<T>) {
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

/**
 * Return a copy of an object without the given keys.
 *
 * @param object the object to loop through
 * @param keys the keys to omit
 */
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

/**
 * Return a copy of an object with the given keys.
 *
 * @param object the object to loop through
 * @param keys the keys to pick
 */
export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result = {} as { [P in K]: T[P] };
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

/**
 * Returns an array of the picked and omited copy of an object based on keys.
 *
 * @param object the object to loop through
 * @param keys the keys to pick
 */
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

/**
 * Returns the keys of an object with correct types
 */
export function keys<T extends Dict>(object: T) {
  return (Object.keys(object) as unknown) as (keyof T)[];
}

/**
 * Returns the [key, value] pair of an object with correct types
 */
export function entries<T extends Dict>(object: T) {
  return Object.entries(object) as [keyof T, T[keyof T]][];
}

export { merge, isEqual, copy };
