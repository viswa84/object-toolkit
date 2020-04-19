import { set } from "..";

test("should return non-objects", function () {
  expect(set("foo", "a.b", "c")).toEqual("foo");
  expect(set(null, "a.b", "c")).toEqual(null);
});

test("should create a nested property if it does not already exist", function () {
  const o: any = {};
  set(o, "a.b", "c");
  expect(o.a.b).toEqual("c");
});

test("should extend an array", function () {
  const o: any = { a: [] };
  set(o, "a[0]", { y: "z" });
  expect(Array.isArray(o.a)).toBeTruthy();
  expect(o.a[0]).toEqual({ y: "z" });
});
