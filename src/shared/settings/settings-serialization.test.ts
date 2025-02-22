import { describe, it, expect } from "vitest";
import {
  endpointsStringToArray,
  parseEndpointsFromQuery,
} from "./settings-serialization";

describe("endpointsStringToArray", () => {
  it("should split endpoints by newline and trim spaces", () => {
    expect(endpointsStringToArray("/api/v1\n /user \n\n /dashboard")).toEqual([
      "/api/v1",
      "/user",
      "/dashboard",
    ]);
  });

  it("should return an empty array for an empty string", () => {
    expect(endpointsStringToArray("")).toEqual([]);
  });
});

describe("parseEndpointsFromQuery", () => {
  it("should split query string by semicolon and trim spaces", () => {
    expect(parseEndpointsFromQuery("/api/v1; /user ; /dashboard")).toEqual([
      "/api/v1",
      "/user",
      "/dashboard",
    ]);
  });

  it("should return an empty array for null input", () => {
    expect(parseEndpointsFromQuery(null)).toEqual([]);
  });
});
