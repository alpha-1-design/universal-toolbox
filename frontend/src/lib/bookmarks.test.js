import { describe, it, expect } from "vitest";
import { toggleInList, mergeBookmarks } from "./bookmarks";

describe("toggleInList", () => {
  it("adds an id that is not present", () => {
    expect(toggleInList([1, 2], 3)).toEqual([1, 2, 3]);
  });

  it("removes an id that is present", () => {
    expect(toggleInList([1, 2, 3], 2)).toEqual([1, 3]);
  });

  it("does not mutate the input", () => {
    const input = [1];
    toggleInList(input, 2);
    expect(input).toEqual([1]);
  });
});

describe("mergeBookmarks", () => {
  it("de-duplicates and coerces ids to numbers", () => {
    expect(mergeBookmarks([1, 2], ["2", 3, 1])).toEqual([1, 2, 3]);
  });

  it("ignores non-numeric junk", () => {
    expect(mergeBookmarks([], [1, null, "abc", undefined])).toEqual([1]);
  });
});
