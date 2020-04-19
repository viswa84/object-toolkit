import { merge } from "..";

test("add keys in target that do not exist at the root", () => {
  const src = { key1: "value1", key2: "value2" };
  const target = { key3: "welcome" };
  const res = merge(src, target);
  expect(res).toEqual({ key1: "value1", key2: "value2", key3: "welcome" });
});
