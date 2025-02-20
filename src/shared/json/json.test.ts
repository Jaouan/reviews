import { describe, expect, it } from "vitest";
import { isValidJson } from "./json";

describe("isValidJson", () => {
  it("should return true for valid json", () => {
    expect(isValidJson(`{ "key": "value" }`)).toBe(true);
  });
  it("should return false for invalid json", () => {
    expect(isValidJson(`{ "key": "value`)).toBe(false);
  });
});
