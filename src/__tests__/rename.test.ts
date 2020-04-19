import { renameKeys } from "..";

test("should rename nested keys.", function () {
  const result = renameKeys(
    { a: "b", c: "d", e: { c: "f", g: { c: "h" } } },
    (key) => (key === "c" ? "zzz" : key)
  );

  expect(result).toEqual({
    a: "b",
    zzz: "d",
    e: { zzz: "f", g: { zzz: "h" } },
  });

  const result2 = renameKeys({ a: { a: { a: "b" } } }, function (key) {
    return key === "a" ? "zzz" : key;
  });

  expect(result2).toEqual({ zzz: { zzz: { zzz: "b" } } });
});

test("should rename pseudo keys.", function () {
  const result = renameKeys(
    {
      _hover: {
        color: "red",
      },
      _active: {
        color: "dark-red",
      },
      _invalid: {
        _hover: {
          color: "red",
        },
      },
    },
    (key) => (key.startsWith("_") ? key.replace("_", "&:") : key)
  );

  expect(result).toEqual({
    "&:hover": {
      color: "red",
    },
    "&:active": {
      color: "dark-red",
    },
    "&:invalid": {
      "&:hover": {
        color: "red",
      },
    },
  });
});

test("should rename keys of objects nested in arrays.", function () {
  const foo = renameKeys(
    [
      {
        a: "b",
        c: "d",
        e: [
          { c: "f", a: { c: "a" } },
          { c: "f", a: { c: "a" } },
          { c: "f", a: { c: "a" } },
        ],
      },
      {
        a: "b",
        c: "d",
        e: [
          { c: "f", a: { c: "a" } },
          { c: "f", a: { c: "a" } },
          { c: "f", a: { c: "a" } },
        ],
      },
    ],
    function (key) {
      if (key === "c") {
        return "zzz";
      }
      return key;
    }
  );
  expect(foo).toEqual([
    {
      a: "b",
      zzz: "d",
      e: [
        { zzz: "f", a: { zzz: "a" } },
        { zzz: "f", a: { zzz: "a" } },
        { zzz: "f", a: { zzz: "a" } },
      ],
    },
    {
      a: "b",
      zzz: "d",
      e: [
        { zzz: "f", a: { zzz: "a" } },
        { zzz: "f", a: { zzz: "a" } },
        { zzz: "f", a: { zzz: "a" } },
      ],
    },
  ]);

  const bar = renameKeys(
    [
      { a: [{ a: [{ a: "a" }, { a: "b" }] }, { a: [{ a: "a" }, { a: "b" }] }] },
      { a: [{ a: [{ a: "a" }, { a: "b" }] }, { a: [{ a: "a" }, { a: "b" }] }] },
    ],
    function (key) {
      if (key === "a") {
        return "zzz";
      }
      return key;
    }
  );
  expect(bar).toEqual([
    {
      zzz: [
        { zzz: [{ zzz: "a" }, { zzz: "b" }] },
        { zzz: [{ zzz: "a" }, { zzz: "b" }] },
      ],
    },
    {
      zzz: [
        { zzz: [{ zzz: "a" }, { zzz: "b" }] },
        { zzz: [{ zzz: "a" }, { zzz: "b" }] },
      ],
    },
  ]);
});
