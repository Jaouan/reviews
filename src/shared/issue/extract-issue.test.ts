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

  it("should extract a valid JIRA from branch name", () => {
    expect(extractIssueRef("FOO-123")).toBe("FOO-123");
  });

  it("should extract a valid JIRA from feature branch name", () => {
    expect(extractIssueRef("features/FOO-123")).toBe("FOO-123");
  });

  it("should extract a valid JIRA from long branch name", () => {
    expect(extractIssueRef("✨FOO-123: introduce a new feature")).toBe(
      "FOO-123"
    );
  });

  it("should return null if no JIRA reference is found in a branch name", () => {
    expect(extractIssueRef("✨Introduce a new feature")).toBeNull();
  });

  it("should handle an empty message", () => {
    expect(extractIssueRef("")).toBeNull();
  });
});
