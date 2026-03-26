import { expect, test, describe } from "bun:test";
import { getTopicById, getTopicsByBranch, getBranchBySlug, topics, branches } from "./topics";

describe("topics library", () => {
  describe("getTopicById", () => {
    test("should return the correct topic for a valid ID", () => {
      const validId = topics[0].id;
      const topic = getTopicById(validId);
      expect(topic).toBeDefined();
      expect(topic?.id).toBe(validId);
    });

    test("should return undefined for an invalid ID", () => {
      const invalidId = "non-existent-id";
      const topic = getTopicById(invalidId);
      expect(topic).toBeUndefined();
    });

    test("should return undefined for an empty string ID", () => {
      const topic = getTopicById("");
      expect(topic).toBeUndefined();
    });
  });

  describe("getTopicsByBranch", () => {
    test("should return topics for a valid branch slug", () => {
      const slug = "quantum-mechanics";
      const branchTopics = getTopicsByBranch(slug);
      expect(branchTopics.length).toBeGreaterThan(0);
      expect(branchTopics.every(t => t.branchSlug === slug)).toBe(true);
    });

    test("should return an empty array for a branch slug with no topics", () => {
      const slug = "classical-electrodynamics";
      const branchTopics = getTopicsByBranch(slug);
      expect(branchTopics).toEqual([]);
    });

    test("should return an empty array for an invalid branch slug", () => {
      const slug = "non-existent-slug";
      const branchTopics = getTopicsByBranch(slug);
      expect(branchTopics).toEqual([]);
    });
  });

  describe("getBranchBySlug", () => {
    test("should return the correct branch for a valid slug", () => {
      const validSlug = branches[0].slug;
      const branch = getBranchBySlug(validSlug);
      expect(branch).toBeDefined();
      expect(branch?.slug).toBe(validSlug);
    });

    test("should return undefined for an invalid slug", () => {
      const invalidSlug = "non-existent-slug";
      const branch = getBranchBySlug(invalidSlug);
      expect(branch).toBeUndefined();
    });
  });
});
