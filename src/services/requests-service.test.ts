import { describe, it, expect } from "vitest";
import { extractShortProjectName, findToken } from "./requests-service";

describe("findToken", () => {
  it("should return the correct token when the endpoint starts with a known key", () => {
    const tokens = { "/api/v1": "token123", "/user": "token456" };
    expect(findToken("/api/v1/resource", tokens)).toBe("token123");
    expect(findToken("/user/profile", tokens)).toBe("token456");
  });

  it("should return undefined when no matching key is found", () => {
    const tokens = { "/api/v1": "token123" };
    expect(findToken("/unknown/path", tokens)).toBeUndefined();
  });
});

describe("extractShortProjectName", () => {
  it("should extract the last part of the path before '!'", () => {
    expect(extractShortProjectName("/path/to/project!refs/heads/main")).toBe(
      "project"
    );
  });

  it("should return the last segment when there is no '!'", () => {
    expect(extractShortProjectName("/another/path/to/repo")).toBe("repo");
  });

  it("should return an empty string if the input is empty", () => {
    expect(extractShortProjectName("")).toBe("");
  });
});
