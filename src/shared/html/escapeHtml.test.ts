import { describe, it, expect } from "vitest";
import { escapeHtml } from "./escapeHtml";

describe("escapeHtml", () => {
  it("escapes &, <, >, \", and ' characters", () => {
    const input = `Tom & Jerry < "The Movie" > '2021'`;
    const output = escapeHtml(input);
    expect(output).toBe(
      "Tom &amp; Jerry &lt; &quot;The Movie&quot; &gt; &#39;2021&#39;"
    );
  });

  it("returns the same string if no special characters are present", () => {
    const input = "Hello World";
    expect(escapeHtml(input)).toBe(input);
  });

  it("escapes multiple occurrences of the same character", () => {
    const input = "5 > 3 && 2 < 4";
    const output = escapeHtml(input);
    expect(output).toBe("5 &gt; 3 &amp;&amp; 2 &lt; 4");
  });

  it("handles an empty string", () => {
    expect(escapeHtml("")).toBe("");
  });
});
