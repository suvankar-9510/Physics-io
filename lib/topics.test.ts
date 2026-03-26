import { describe, it, expect } from 'bun:test';
import { getTopicsByBranch, getTopicById, getBranchBySlug } from './topics';

describe('getTopicsByBranch', () => {
  it('should return topics belonging to the specified branch slug', () => {
    const results = getTopicsByBranch('quantum-mechanics');

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(6);

    // Verify all returned items match the requested slug
    results.forEach(topic => {
      expect(topic.branchSlug).toBe('quantum-mechanics');
    });
  });

  it('should return an empty array when given a non-existent branch slug', () => {
    const results = getTopicsByBranch('non-existent-branch');

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });

  it('should return an empty array when given an existing branch with no topics', () => {
    const results = getTopicsByBranch('optics-photonics');

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });
});

describe('getTopicById', () => {
  it('should return the correct topic for a given id', () => {
    const topic = getTopicById('harmonic-oscillator');
    expect(topic).toBeDefined();
    expect(topic?.name).toBe('Harmonic Oscillator');
    expect(topic?.branchSlug).toBe('quantum-mechanics');
  });

  it('should return undefined for a non-existent id', () => {
    const topic = getTopicById('non-existent-id');
    expect(topic).toBeUndefined();
  });
});

describe('getBranchBySlug', () => {
  it('should return the correct branch for a given slug', () => {
    const branch = getBranchBySlug('solid-state-physics');
    expect(branch).toBeDefined();
    expect(branch?.name).toBe('Solid-State Physics');
    expect(branch?.id).toBe('ss');
  });

  it('should return undefined for a non-existent slug', () => {
    const branch = getBranchBySlug('invalid-slug');
    expect(branch).toBeUndefined();
  });
});
