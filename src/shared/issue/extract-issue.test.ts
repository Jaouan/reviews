import { describe, it, expect } from "vitest";
import { extractIssueRef } from "./extract-issue";

describe("extractJiraRef", () => {
  it("should extract a valid JIRA reference", () => {
    expect(extractIssueRef("Draft: ✨ FOO-123: Doing some thing")).toBe(
      "FOO-123"
    );
  });

  it("should return null if no JIRA reference is found", () => {
    expect(extractIssueRef("No reference here")).toBeNull();
  });

  it("should extract only the first JIRA reference", () => {
    expect(extractIssueRef("Draft: FOO-123 BAR-456")).toBe("FOO-123");
  });

  it("should handle an empty message", () => {
    expect(extractIssueRef("")).toBeNull();
  });
});
