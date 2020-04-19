declare module "deep-rename-keys" {
  export = renameDeep;

  declare function renameDeep<T extends object>(
    object: T,
    cb: (key: string) => string
  ): Record<string, any>;

  declare function renameDeep(object: any, cb: Function): Record<string, any>;
}
