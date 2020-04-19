import { remove } from "..";

it("should update the given object when a property is deleted:", function () {
  var obj = { a: "b" };
  remove(obj, "a");
  expect(obj).toEqual({});
});

it("should return true when a property is deleted:", function () {
  const hasDeleted = expect(remove({ a: "b" }, "a"));
  expect(hasDeleted).toBeTruthy();
});

it("should return true when the given property does not exist:", function () {
  expect(remove({ a: "b" }, "z")).toBe(true);
});

it("should delete nested values:", function () {
  const one = { a: { b: { c: "d" } } };
  remove(one, "a.b");
  expect(one).toEqual({ a: {} });

  const two = { a: { b: { c: "d" } } };
  remove(two, "a.b.c");
  expect(two).toEqual({ a: { b: {} } });

  const three = { a: { b: { c: "d", e: "f" } } };
  remove(three, "a.b.c");
  expect(three).toEqual({ a: { b: { e: "f" } } });
});

it("should delete...:", function () {
  const three = { "a.b": "c", d: "e" };
  remove(three, "a.b");
  expect(three).toEqual({ d: "e" });
});
