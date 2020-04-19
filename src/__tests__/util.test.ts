import { resolvePath } from "../utils";

test("resolve path", () => {
  const result = resolvePath("a.b[0]");
  expect(result).toEqual(["a", "b", "0"]);
});

test("resolve path 2", () => {
  const result = resolvePath("a.b");
  expect(result).toEqual(["a", "b"]);
});

test("resolve path 2", () => {
  const result = resolvePath("a.b[2].c.d[0]");
  expect(result).toEqual(["a", "b", "2", "c", "d", "0"]);
});
