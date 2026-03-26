import { expect, test, describe } from "bun:test";
import { computeWKB } from "./wkb";

describe("computeWKB", () => {
  test("returns oscillatory points when particleEnergy > barrierHeight", () => {
    // V < particleEnergy everywhere
    const points = computeWKB(10, 20, 1, 1, 0, 100);
    expect(points.length).toBe(101);

    // Verify no NaN or Infinity values
    points.forEach(p => {
      expect(Number.isFinite(p.psi)).toBe(true);
      expect(Number.isNaN(p.psi)).toBe(false);
    });
  });

  test("handles exponential decay when particleEnergy < barrierHeight", () => {
    // V >= particleEnergy inside the barrier
    const points = computeWKB(20, 10, 1, 1, 0, 100);
    expect(points.length).toBe(101);

    // Verify no NaN or Infinity values
    points.forEach(p => {
      expect(Number.isFinite(p.psi)).toBe(true);
      expect(Number.isNaN(p.psi)).toBe(false);
    });
  });

  test("handles the edge case where particleEnergy == barrierHeight", () => {
    // V == particleEnergy
    const points = computeWKB(10, 10, 1, 1, 0, 100);
    expect(points.length).toBe(101);

    // Verify no NaN or Infinity values
    points.forEach(p => {
      expect(Number.isFinite(p.psi)).toBe(true);
      expect(Number.isNaN(p.psi)).toBe(false);
    });
  });

  test("handles extreme particle energy edge cases", () => {
    // very high energy
    const highEnergyPoints = computeWKB(10, 1000000, 1, 1, 0, 10);
    highEnergyPoints.forEach(p => {
      expect(Number.isFinite(p.psi)).toBe(true);
      expect(Number.isNaN(p.psi)).toBe(false);
    });

    // very low energy (negative)
    const lowEnergyPoints = computeWKB(10, -1000000, 1, 1, 0, 10);
    lowEnergyPoints.forEach(p => {
      expect(Number.isFinite(p.psi)).toBe(true);
      expect(Number.isNaN(p.psi)).toBe(false);
    });

    // zero energy
    const zeroEnergyPoints = computeWKB(10, 0, 1, 1, 0, 10);
    zeroEnergyPoints.forEach(p => {
      expect(Number.isFinite(p.psi)).toBe(true);
      expect(Number.isNaN(p.psi)).toBe(false);
    });
  });
});
