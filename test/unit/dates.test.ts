import { describe, expect, it } from "vitest";
import { formatDisplayDate, getLastDays, isSameDateKey, toDateKey } from "@/lib/dates";

describe("date helpers", () => {
  it("formats stable date keys", () => {
    expect(toDateKey(new Date("2026-05-02T12:00:00.000Z"))).toBe("2026-05-02");
    expect(isSameDateKey("2026-05-02", "2026-05-02")).toBe(true);
  });

  it("returns last days in chronological order", () => {
    expect(getLastDays(3, new Date("2026-05-10T12:00:00.000Z"))).toEqual(["2026-05-08", "2026-05-09", "2026-05-10"]);
  });

  it("formats display dates in French", () => {
    expect(formatDisplayDate("2026-05-02")).toContain("mai");
  });
});
