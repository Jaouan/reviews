import { describe, expect, it, vi } from "vitest";
import { isLessThanHours, getDaysAgo } from "./human-time";

const mockDate = (isoString: string) => {
  vi.setSystemTime(new Date(isoString));
};

describe("isLessThanHours", () => {
  it("should return true if the date is within the given hours", () => {
    mockDate("2024-02-20T12:00:00Z");
    const pastDate = new Date("2024-02-20T10:00:00Z");
    expect(isLessThanHours(pastDate, 3)).toBe(true);
  });

  it("should return false if the date is beyond the given hours", () => {
    mockDate("2024-02-20T12:00:00Z");
    const pastDate = new Date("2024-02-20T08:00:00Z");
    expect(isLessThanHours(pastDate, 3)).toBe(false);
  });
});

describe("getDaysAgo", () => {
  it("should return 0 for today's date", () => {
    mockDate("2024-02-20T12:00:00Z");
    const today = new Date("2024-02-20");
    expect(getDaysAgo(today)).toBe(0);
  });

  it("should return correct days for past dates", () => {
    mockDate("2024-02-20T12:00:00Z");
    const pastDate = new Date("2024-02-18");
    expect(getDaysAgo(pastDate)).toBe(2);
  });

  it("should return 0 if future date is given", () => {
    mockDate("2024-02-20T12:00:00Z");
    const futureDate = new Date("2024-02-22");
    expect(getDaysAgo(futureDate)).toBe(0);
  });
});
