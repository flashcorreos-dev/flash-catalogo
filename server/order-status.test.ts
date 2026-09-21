import { describe, expect, it } from "vitest";
import { ORDER_STATUSES } from "../drizzle/schema";

describe("order status workflow", () => {
  it("includes every customer-visible stage", () => {
    expect(ORDER_STATUSES).toEqual(["pending", "confirmed", "dispatched", "completed", "cancelled"]);
  });
});
