// Pure, framework-free search utilities for Universal Toolbox.
// Kept separate from React so they can be unit-tested and reused
// (global command palette, home search, category/browse filters).
import Fuse from "fuse.js";

/**
 * Substring match used for full result lists and inline category/browse filters.
 * Matches against name, description, tags and category id.
 * @param {Array} tools
 * @param {string} query
 * @returns {Array}
 */
export function filterTools(tools, query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}

const FUSE_KEYS = [
  { name: "name", weight: 0.5 },
  { name: "desc", weight: 0.2 },
  { name: "tags", weight: 0.2 },
  { name: "category", weight: 0.1 },
];

/**
 * Build a fuzzy searcher (typo-tolerant, ranked) backed by Fuse.js.
 * Memoize the returned function against the tools array for performance.
 * @param {Array} tools
 * @param {object} [fuseOptions] – overrides merged into the default Fuse config
 * @returns {(query: string, limit?: number) => Array}
 */
export function createFuzzySearch(tools, fuseOptions = {}) {
  const fuse = new Fuse(tools, {
    keys: FUSE_KEYS,
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
    ...fuseOptions,
  });
  return (query, limit = 8) => {
    const q = (query || "").trim();
    if (!q) return [];
    return fuse.search(q).slice(0, limit).map((r) => r.item);
  };
}
