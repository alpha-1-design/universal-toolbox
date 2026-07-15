// Validates the tool/category dataset used by the app.
// Run with: npm run lint:data
import { tools, categories } from "../src/data/index.js";

const errors = [];
const warnings = [];

// ── Tools ────────────────────────────────────────────────────────────────
const seenIds = new Set();
const seenUrls = new Set();

for (const t of tools) {
  if (t.id == null) {
    errors.push(`Tool is missing an id: ${JSON.stringify(t.name)}`);
  } else if (seenIds.has(t.id)) {
    errors.push(`Duplicate tool id: ${t.id}`);
  } else {
    seenIds.add(t.id);
  }

  if (!t.name || typeof t.name !== "string") {
    errors.push(`Tool ${t.id} is missing a name`);
  }
  if (!t.url || !/^https?:\/\//i.test(t.url || "")) {
    errors.push(`Tool ${t.id} (${t.name}) has an invalid url: ${t.url}`);
  } else if (seenUrls.has(t.url)) {
    warnings.push(`Duplicate url: ${t.url} (${t.name})`);
  } else {
    seenUrls.add(t.url);
  }
  if (!t.category) {
    errors.push(`Tool ${t.id} (${t.name}) is missing a category`);
  } else if (!categories.find((c) => c.id === t.category)) {
    errors.push(`Tool ${t.id} (${t.name}) references unknown category: ${t.category}`);
  }
  if (!Array.isArray(t.tags) || t.tags.length === 0) {
    warnings.push(`Tool ${t.id} (${t.name}) has no tags`);
  }
  if (typeof t.rating === "number" && (t.rating < 0 || t.rating > 5)) {
    warnings.push(`Tool ${t.id} (${t.name}) rating out of range: ${t.rating}`);
  }
}

// ── Categories ─────────────────────────────────────────────────────────────
const seenCatIds = new Set();
for (const c of categories) {
  if (seenCatIds.has(c.id)) {
    errors.push(`Duplicate category id: ${c.id}`);
  } else {
    seenCatIds.add(c.id);
  }
  const count = tools.filter((t) => t.category === c.id).length;
  if (count === 0) warnings.push(`Category "${c.id}" (${c.name}) has no tools`);
}

console.log(`Tools: ${tools.length} · Categories: ${categories.length}`);

if (warnings.length) {
  console.log(`\n⚠  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`   - ${w}`));
}

if (errors.length) {
  console.error(`\n✗  ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`   - ${e}`));
  process.exit(1);
}

console.log("\n✓  Data is valid.");
