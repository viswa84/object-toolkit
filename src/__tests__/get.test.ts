import { get } from "..";

test("should get value from object", () => {
  const test = {
    dob: null,
    plan: {
      name: "Pro",
      currency: "ngn",
      duration: "quarterly",
    },
    location: { address: "Uyo, Nigeria", country: "Nigeria" },
  };

  const result = get(test, "plan.currency");
  expect(result).toEqual("ngn");
});

it("should get a value", function () {
  expect(get({ a: "a", b: { c: "d" } }, "a")).toEqual("a");
  expect(get({ a: "a", b: { c: "d" } }, "b.c")).toEqual("d");
  expect(get({ foo: "bar" }, "foo.bar")).toBeUndefined();
});

it("should get a property that has dots in the key", function () {
  expect(get({ "a.b": "c" }, "a.b")).toEqual("c");
});
