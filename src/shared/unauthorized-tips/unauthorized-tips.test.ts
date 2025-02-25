import { describe, it, expect } from "vitest";
import { getUnauthorizedTips } from "./unauthorized-tips";
import { FetchError } from "../types";

describe("getUnauthorizedTips", () => {
  it("should return an empty object when there are no errors", () => {
    expect(getUnauthorizedTips([])).toBe(null);
  });

  it("should return an empty object when no error is unauthorized", () => {
    const errors = [
      { endpoint: "/api/data", cause: {} },
      { endpoint: "/api/user", cause: { unauthorized: false } },
    ];
    expect(getUnauthorizedTips(errors)).toBe(null);
  });

  it("should return a formatted JSON object with unauthorized endpoints", () => {
    const errors = [
      { endpoint: "/api/data", cause: { unauthorized: true } },
      { endpoint: "/api/user", cause: { unauthorized: true } },
    ];

    expect(getUnauthorizedTips(errors)).toBe(
      JSON.stringify(
        {
          "/api/data": "Bearer <TOKEN>",
          "/api/user": "Bearer <TOKEN>",
        },
        null,
        2
      )
    );
  });

  it("should handle errors with missing endpoint", () => {
    const errors = [{ cause: { unauthorized: true } }];

    expect(getUnauthorizedTips(errors)).toBe(JSON.stringify({}, null, 2));
  });

  it("should ignore errors without a cause", () => {
    const errors = [
      { endpoint: "/api/data" },
      { endpoint: "/api/user", cause: { unauthorized: true } },
    ];

    expect(getUnauthorizedTips(errors as FetchError[])).toBe(
      JSON.stringify(
        {
          "/api/user": "Bearer <TOKEN>",
        },
        null,
        2
      )
    );
  });
});
