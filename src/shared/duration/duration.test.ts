import { describe, it, expect } from "vitest";
import { getReadableDuration } from "./duration";

describe("getReadableDuration", () => {
  it("should return '1h' when input is 60", () => {
    expect(getReadableDuration(60)).toBe("1h");
  });

  it("should return '<minutes>m' when input is not 60", () => {
    expect(getReadableDuration(45)).toBe("45m");
    expect(getReadableDuration(30)).toBe("30m");
    expect(getReadableDuration(90)).toBe("90m");
  });
});
