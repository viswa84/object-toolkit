import { get } from "../src";

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
