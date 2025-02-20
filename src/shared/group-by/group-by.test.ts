import { describe, expect, it } from "vitest";
import { groupBy } from "./group-by";

describe("groupBy", () => {
  it("should group items by a given key function", () => {
    const data = [
      { category: "fruit", name: "apple" },
      { category: "fruit", name: "banana" },
      { category: "vegetable", name: "carrot" },
    ];

    const result = groupBy(data, (item) => item.category);

    expect(result).toEqual({
      fruit: [
        { category: "fruit", name: "apple" },
        { category: "fruit", name: "banana" },
      ],
      vegetable: [{ category: "vegetable", name: "carrot" }],
    });
  });

  it("should return an empty object if the array is empty", () => {
    const result = groupBy([], (item) => item);
    expect(result).toEqual({});
  });

  it("should handle grouping by numbers", () => {
    const data = [1, 2, 3, 4, 5, 6];
    const result = groupBy(data, (num) => (num % 2 === 0 ? "even" : "odd"));

    expect(result).toEqual({
      odd: [1, 3, 5],
      even: [2, 4, 6],
    });
  });

  it("should handle grouping by boolean values", () => {
    const data = [true, false, true, false, true];
    const result = groupBy(data, (val) => val.toString());

    expect(result).toEqual({
      true: [true, true, true],
      false: [false, false],
    });
  });
});
