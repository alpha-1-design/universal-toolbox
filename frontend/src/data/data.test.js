import { describe, it, expect } from "vitest";
import { tools, categories } from "../data";

describe("tool dataset integrity", () => {
  it("has 700+ tools", () => {
    expect(tools.length).toBeGreaterThanOrEqual(700);
  });

  it("has unique tool ids", () => {
    const ids = tools.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has valid http(s) urls and required fields", () => {
    for (const t of tools) {
      expect(t.name, `tool ${t.id} should have a name`).toBeTruthy();
      expect(t.url, `tool ${t.id} should have a url`).toMatch(/^https?:\/\//i);
      expect(Array.isArray(t.tags), `tool ${t.id} should have tags`).toBe(true);
    }
  });

  it("every tool references a known category", () => {
    const catIds = new Set(categories.map((c) => c.id));
    for (const t of tools) {
      expect(catIds.has(t.category), `tool ${t.id} (${t.name}) -> ${t.category}`).toBe(true);
    }
  });

  it("every category has at least one tool", () => {
    for (const c of categories) {
      const count = tools.filter((t) => t.category === c.id).length;
      expect(count, `category ${c.id} should have tools`).toBeGreaterThan(0);
    }
  });
});
