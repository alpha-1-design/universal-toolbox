// Pure bookmark helpers — kept framework-free so they can be unit-tested
// and reused by the context provider and the import/export flow.

/** Toggle an id in a list of bookmarked ids (immutably). */
export function toggleInList(list, id) {
  return list.includes(id)
    ? list.filter((x) => x !== id)
    : [...list, id];
}

/** Merge imported bookmark ids into the current list, de-duplicating. */
export function mergeBookmarks(current, incoming) {
  const set = new Set(current.map(Number));
  for (const id of incoming) {
    if (id == null) continue;
    const n = Number(id);
    if (!Number.isNaN(n)) set.add(n);
  }
  return [...set];
}
