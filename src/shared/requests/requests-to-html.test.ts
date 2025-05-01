import { describe, it, expect } from "vitest";
import { requestsGroupToHtmlFactory, requestsToHtml } from "./requests-to-html";
import { MergeRequest } from "../types";

const mockRequests = [
  {
    title: "Fix bug #123",
    web_url: "https://example.com/mr/1",
    updated_at: new Date().toISOString(),
    project: "Project A",
    issue: "FOO-123",
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

describe("requestsGroupToHtmlFactory", () => {
  it("should group requests by project and format them correctly", () => {
    const formatRequests = requestsGroupToHtmlFactory("project");
    const result = formatRequests(mockRequests);
    expect(result).toBe(`<pre><span style="font-weight:bold;">Project A</span>
- <a href="https://example.com/mr/1">Fix bug #123</a> <span style="color:gray;">(today)</span>
- <a href="https://example.com/mr/3">Improve performance</a> <span style="color:gray;">(today)</span>

<span style="font-weight:bold;">Project B</span>
- <a href="https://example.com/mr/2">Add new feature</a> <span style="color:gray;">(today)</span></pre>`);
  });

  it("should return an empty string when given an empty array", () => {
    const formatRequests = requestsGroupToHtmlFactory("project");
    expect(formatRequests([])).toBe("<pre></pre>");
  });

  it("should handle undefined", () => {
    const formatRequests = requestsGroupToHtmlFactory("issue");
    expect(formatRequests(mockRequests))
      .toBe(`<pre><span style="font-weight:bold;">FOO-123</span>
- <a href="https://example.com/mr/1">Fix bug #123</a> <span style="color:gray;">(today)</span>

<span style="font-weight:bold;">Others</span>
- <a href="https://example.com/mr/2">Add new feature</a> <span style="color:gray;">(today)</span>
- <a href="https://example.com/mr/3">Improve performance</a> <span style="color:gray;">(today)</span></pre>`);
  });
});

describe("requestsToHtml", () => {
  it("should format a list of requests correctly", () => {
    const result = requestsToHtml(mockRequests);
    expect(result)
      .toBe(`- <a href="https://example.com/mr/1">Fix bug #123</a> <span style="color:gray;">(today)</span>
- <a href="https://example.com/mr/2">Add new feature</a> <span style="color:gray;">(today)</span>
- <a href="https://example.com/mr/3">Improve performance</a> <span style="color:gray;">(today)</span>`);
  });

  it("should return an empty string when given an empty array", () => {
    expect(requestsToHtml([])).toBe("");
  });
});
