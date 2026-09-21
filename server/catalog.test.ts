import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("catalog", () => {
  it("returns the imported product catalog with variants", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const products = await caller.catalog.list();
    expect(products).toHaveLength(40);
    expect(products.every(product => product.variants.length > 0)).toBe(true);
    expect(products.some(product => product.name.includes("Arnes"))).toBe(true);
  });

  it("returns unique category filters", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const categories = await caller.catalog.categories();
    expect(categories.length).toBeGreaterThan(20);
    expect(new Set(categories.map(category => category.slug)).size).toBe(categories.length);
  });
});
