import { describe, it, expect } from "vitest";
import { expandEndpointPattern } from "./endpoint-pattern";

describe("expandEndpointPatter", () => {
  it("should expand URL pattern with multiple values", () => {
    const input = "/groups/{1234,456,789}/subgroup";
    const expected = [
      "/groups/1234/subgroup",
      "/groups/456/subgroup",
      "/groups/789/subgroup",
    ];
    expect(expandEndpointPattern(input)).toEqual(expected);
  });
  it("should expand URL pattern with multiple values only for the first match", () => {
    const input = "/groups/{1234,456,789}/subgroup/{not,resolved}";
    const expected = [
      "/groups/1234/subgroup/{not,resolved}",
      "/groups/456/subgroup/{not,resolved}",
      "/groups/789/subgroup/{not,resolved}",
    ];
    expect(expandEndpointPattern(input)).toEqual(expected);
  });
  it("should return the same URL if no pattern is found", () => {
    const input = "/groups/1234/subgroup";
    expect(expandEndpointPattern(input)).toEqual([input]);
  });
});
