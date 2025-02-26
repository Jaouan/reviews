import { describe, it, expect } from "vitest";
import {
  requestsGroupToStringFactory,
  requestsToString,
} from "./requests-to-str";
import { MergeRequest } from "../types";

const mockRequests = [
  {
    title: "Fix bug #123",
    web_url: "https://example.com/mr/1",
    updated_at: new Date().toISOString(),
    project: "Project A",
  },
  {
    title: "Add new feature",
    web_url: "https://example.com/mr/2",
    updated_at: new Date().toISOString(),
    project: "Project B",
  },
  {
    title: "Improve performance",
    web_url: "https://example.com/mr/3",
    updated_at: new Date().toISOString(),
    project: "Project A",
  },
] as MergeRequest[];

describe("requestsGroupToStringFactory", () => {
  it("should group requests by project and format them correctly", () => {
    const formatRequests = requestsGroupToStringFactory("project");
    const result = formatRequests(mockRequests);

    expect(result).toBe(`Project A
  - Fix bug #123 - https://example.com/mr/1 (today)
  - Improve performance - https://example.com/mr/3 (today)

Project B
  - Add new feature - https://example.com/mr/2 (today)`);
  });

  it("should return an empty string when given an empty array", () => {
    const formatRequests = requestsGroupToStringFactory("project");
    expect(formatRequests([])).toBe("");
  });
});

describe("requestsToString", () => {
  it("should format a list of requests correctly", () => {
    const result = requestsToString(mockRequests);
    expect(result).toBe(`  - Fix bug #123 - https://example.com/mr/1 (today)
  - Add new feature - https://example.com/mr/2 (today)
  - Improve performance - https://example.com/mr/3 (today)`);
  });

  it("should return an empty string when given an empty array", () => {
    expect(requestsToString([])).toBe("");
  });
});
