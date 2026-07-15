import { describe, it, expect } from "vitest";
import { filterTools, createFuzzySearch } from "./search";

const TOOLS = [
  { id: 1, name: "ChatGPT", url: "https://chat.openai.com", category: "ai", desc: "AI chat assistant", tags: ["chat", "writing"] },
  { id: 2, name: "Figma", url: "https://figma.com", category: "design", desc: "Interface design tool", tags: ["ui", "prototype"] },
  { id: 3, name: "GitHub", url: "https://github.com", category: "dev", desc: "Code hosting", tags: ["git", "version-control"] },
  { id: 4, name: "Notion", url: "https://notion.so", category: "productivity", desc: "Notes and docs", tags: ["notes", "wiki"] },
];

describe("filterTools (substring)", () => {
  it("returns [] for empty query", () => {
    expect(filterTools(TOOLS, "")).toEqual([]);
    expect(filterTools(TOOLS, "   ")).toEqual([]);
  });

  it("matches by name (case-insensitive)", () => {
    expect(filterTools(TOOLS, "figma").map((t) => t.id)).toEqual([2]);
  });

  it("matches by tag", () => {
    expect(filterTools(TOOLS, "git").map((t) => t.id)).toContain(3);
  });

  it("matches by category id", () => {
    expect(filterTools(TOOLS, "design").map((t) => t.id)).toEqual([2]);
  });

  it("matches by description", () => {
    expect(filterTools(TOOLS, "assistant").map((t) => t.id)).toEqual([1]);
  });
});

describe("createFuzzySearch (Fuse.js)", () => {
  const search = createFuzzySearch(TOOLS);

  it("is typo tolerant", () => {
    const ids = search("chatgtp").map((t) => t.id);
    expect(ids).toContain(1);
  });

  it("returns ranked results limited to the requested size", () => {
    const res = search("git", 2);
    expect(res.length).toBeLessThanOrEqual(2);
    expect(res.map((t) => t.id)).toContain(3);
  });

  it("returns [] for empty query", () => {
    expect(search("")).toEqual([]);
  });
});
