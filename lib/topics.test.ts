import { describe, test, expect } from 'bun:test';
import { getTopicsByBranch, getTopicById, getBranchBySlug } from './topics';

describe('topics', () => {
  describe('getTopicsByBranch', () => {
    test('returns topics for a valid branch slug', () => {
      const result = getTopicsByBranch('quantum-mechanics');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(t => t.branchSlug === 'quantum-mechanics')).toBe(true);
    });

    test('returns empty array for an invalid branch slug', () => {
      const result = getTopicsByBranch('invalid-slug');
      expect(result).toEqual([]);
    });
  });

  describe('getTopicById', () => {
    test('returns the correct topic for a valid id', () => {
      const topic = getTopicById('infinite-square-well');
      expect(topic).toBeDefined();
      expect(topic?.id).toBe('infinite-square-well');
    });

    test('returns undefined for an invalid id', () => {
      const topic = getTopicById('invalid-id');
      expect(topic).toBeUndefined();
    });
  });

  describe('getBranchBySlug', () => {
    test('returns the correct branch for a valid slug', () => {
      const branch = getBranchBySlug('quantum-mechanics');
      expect(branch).toBeDefined();
      expect(branch?.slug).toBe('quantum-mechanics');
    });

    test('returns undefined for an invalid slug', () => {
      const branch = getBranchBySlug('invalid-slug');
      expect(branch).toBeUndefined();
    });
  });
});
