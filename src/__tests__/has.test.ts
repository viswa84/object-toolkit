import { has } from "..";

it("should return true a nested key is an own property of the given object", function () {
  expect(has({ a: { b: { c: "d" } } }, "a")).toBeTruthy();
  expect(has({ a: { b: { c: "d" } } }, "a.b")).toBeTruthy();
  expect(has({ a: { b: { c: "d" } } }, "a.b.c")).toBeTruthy();
});

it("should support nested keys with dots in them", function () {
  expect(has({ "a.b.c": "d" }, "a.b.c")).toBeTruthy();
  expect(has({ "a.b": { c: "d" } }, "a.b.c")).toBeTruthy();
  expect(has({ a: { b: { c: "d" } } }, "a.b.c")).toBeTruthy();
  expect(has({ a: { "b.c": "d" } }, "a.b.c")).toBeTruthy();
  expect(!has({ "a.b.c.d": "e" }, "a.b.c")).toBeTruthy();

  expect(has({ "a.b.c.d.e.f": "g" }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ "a.b.c.d.e": { f: "g" } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ "a.b.c.d": { e: { f: "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(
    has({ "a.b.c": { d: { e: { f: "g" } } } }, "a.b.c.d.e.f")
  ).toBeTruthy();
  expect(
    has({ "a.b": { c: { d: { e: { f: "g" } } } } }, "a.b.c.d.e.f")
  ).toBeTruthy();
  expect(
    has({ a: { b: { c: { d: { e: { f: "g" } } } } } }, "a.b.c.d.e.f")
  ).toBeTruthy();

  expect(has({ "a.b.c.d.e": { f: "g" } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ "a.b.c.d": { "e.f": "g" } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ "a.b.c": { "d.e.f": "g" } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ "a.b": { "c.d.e.f": "g" } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ a: { "b.c.d.e.f": "g" } }, "a.b.c.d.e.f")).toBeTruthy();

  expect(has({ "a.b": { "c.d": { "e.f": "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ "a.b": { c: { "d.e.f": "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ a: { "b.c.d.e": { f: "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ a: { "b.c.d": { "e.f": "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ a: { "b.c": { "d.e.f": "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
  expect(has({ a: { b: { "c.d.e.f": "g" } } }, "a.b.c.d.e.f")).toBeTruthy();
});

it("should work with falsey values", function () {
  expect(has({ a: { b: { c: "" } } }, "a")).toBeTruthy();
  expect(has({ a: { b: { c: "" } } }, "a.b")).toBeTruthy();
  expect(has({ a: { b: { c: "" } } }, "a.b.c")).toBeTruthy();
  expect(has({ a: { b: { c: 0 } } }, "a")).toBeTruthy();
  expect(has({ a: { b: { c: 0 } } }, "a.b")).toBeTruthy();
  expect(has({ a: { b: { c: 0 } } }, "a.b.c")).toBeTruthy();
  expect(has({ a: { b: { c: false } } }, "a")).toBeTruthy();
  expect(has({ a: { b: { c: false } } }, "a.b")).toBeTruthy();
  expect(has({ a: { b: { c: false } } }, "a.b.c")).toBeTruthy();
  expect(has({ a: { b: { c: null } } }, "a")).toBeTruthy();
  expect(has({ a: { b: { c: null } } }, "a.b")).toBeTruthy();
  expect(has({ a: { b: { c: null } } }, "a.b.c")).toBeTruthy();
  expect(has({ a: { b: { c: undefined } } }, "a")).toBeTruthy();
  expect(has({ a: { b: { c: undefined } } }, "a.b")).toBeTruthy();
  expect(has({ a: { b: { c: undefined } } }, "a.b.c")).toBeTruthy();
});
