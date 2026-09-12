/**
 * Unit Tests: Probabilistic Search Post Sorting
 * 
 * Phase: 1 — Backend Unit Tests
 * 
 * Tests sortSearchPostsByLikelihood() — a weighted-random sort algorithm
 * that ranks posts by their likelihoodIndex. Posts with higher likelihood
 * are more likely (but not guaranteed) to appear first.
 */

import { sortSearchPostsByLikelihood } from '../../utils/helperFunctions.js';

describe('sortSearchPostsByLikelihood', () => {
  it('should return empty array for null input', () => {
    expect(sortSearchPostsByLikelihood(null)).toEqual([]);
  });

  it('should return empty array for empty array', () => {
    expect(sortSearchPostsByLikelihood([])).toEqual([]);
  });

  it('should return all posts (same length as input)', () => {
    const posts = [
      { _id: 'a', stats: { likelihoodIndex: 5 } },
      { _id: 'b', stats: { likelihoodIndex: 3 } },
      { _id: 'c', stats: { likelihoodIndex: 1 } },
    ];
    const result = sortSearchPostsByLikelihood(posts);
    expect(result).toHaveLength(3);
  });

  it('should contain the same posts as the input (order may differ)', () => {
    const posts = [
      { _id: 'a', stats: { likelihoodIndex: 5 } },
      { _id: 'b', stats: { likelihoodIndex: 3 } },
      { _id: 'c', stats: { likelihoodIndex: 1 } },
    ];
    const result = sortSearchPostsByLikelihood(posts);
    expect(result.map((p) => p._id)).toEqual(
      expect.arrayContaining(['a', 'b', 'c'])
    );
  });

  it('should not mutate the original array', () => {
    const posts = [{ _id: 'a', stats: { likelihoodIndex: 1 } }];
    const originalLength = posts.length;
    sortSearchPostsByLikelihood(posts);
    expect(posts).toHaveLength(originalLength);
  });

  it('should handle a single post', () => {
    const posts = [{ _id: 'only', stats: { likelihoodIndex: 10 } }];
    const result = sortSearchPostsByLikelihood(posts);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('only');
  });

  it('should handle posts without stats (defaults to likelihoodIndex 1)', () => {
    const posts = [
      { _id: 'a' }, // no stats
      { _id: 'b', stats: { likelihoodIndex: 5 } },
    ];
    const result = sortSearchPostsByLikelihood(posts);
    expect(result).toHaveLength(2);
    expect(result.map((p) => p._id)).toEqual(
      expect.arrayContaining(['a', 'b'])
    );
  });

  it('should handle posts with likelihoodIndex of 0', () => {
    const posts = [
      { _id: 'a', stats: { likelihoodIndex: 0 } },
      { _id: 'b', stats: { likelihoodIndex: 0 } },
    ];
    const result = sortSearchPostsByLikelihood(posts);
    expect(result).toHaveLength(2);
  });

  it('should handle posts with undefined likelihoodIndex', () => {
    const posts = [
      { _id: 'a', stats: {} },
      { _id: 'b', stats: { likelihoodIndex: undefined } },
    ];
    const result = sortSearchPostsByLikelihood(posts);
    expect(result).toHaveLength(2);
  });
});
