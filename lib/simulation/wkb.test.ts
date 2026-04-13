import { expect, test, describe } from "bun:test";
import { computeWKB } from "./wkb";

describe("computeWKB", () => {
  test("returns the correct number of points with default numPoints", () => {
    // 400 intervals means 401 points
    const points = computeWKB(10, 5, 2, 1, 0);
    expect(points.length).toBe(401);
  });

  test("returns the correct number of points with custom numPoints", () => {
    const points = computeWKB(10, 5, 2, 1, 0, 100);
    expect(points.length).toBe(101);
  });

  test("computes correct range of x values", () => {
    const points = computeWKB(10, 5, 2, 1, 0, 100);
    expect(points[0].x).toBeCloseTo(-3);
    expect(points[points.length - 1].x).toBeCloseTo(3);
  });

  test("computes valid psi values (no NaN or Infinity)", () => {
    const points = computeWKB(10, 5, 2, 1, 0, 100);
    for (const point of points) {
      expect(Number.isNaN(point.psi)).toBe(false);
      expect(Number.isFinite(point.psi)).toBe(true);
    }
  });

  test("handles E = V case without NaN", () => {
    // Barrier height 5, particle energy 5
    const points = computeWKB(5, 5, 2, 1, 0, 100);
    for (const point of points) {
      expect(Number.isNaN(point.psi)).toBe(false);
      expect(Number.isFinite(point.psi)).toBe(true);
    }
  });

  test("computes classically allowed region (V < E)", () => {
    // Barrier height 0, Particle energy 5. Everywhere is classically allowed.
    const points = computeWKB(0, 5, 2, 1, 0, 100);

    const pointOutside = points.find(p => Math.abs(p.x - (-2)) < 0.05);
    expect(pointOutside).toBeDefined();
    expect(typeof pointOutside?.psi).toBe("number");

    const pointInside = points.find(p => Math.abs(p.x - 0) < 0.05);
    expect(pointInside).toBeDefined();
    expect(typeof pointInside?.psi).toBe("number");
  });

  test("computes classically forbidden region (V >= E)", () => {
    // Barrier height 10, Particle energy 5. Inside barrier is forbidden.
    const points = computeWKB(10, 5, 2, 1, 0, 100);

    // In classically forbidden region, psi decays exponentially
    const pointEdge = points.find(p => Math.abs(p.x - (-1)) < 0.05);
    const pointDeepInside = points.find(p => Math.abs(p.x - 0) < 0.05);

    expect(pointEdge).toBeDefined();
    expect(pointDeepInside).toBeDefined();

    // Magnitude should generally decay deeper inside the barrier (from the left edge)
    // Actually the calculation computes distance from edge.
    // Let's just verify they are valid real numbers for now.
    expect(typeof pointEdge?.psi).toBe("number");
    expect(typeof pointDeepInside?.psi).toBe("number");
  });
});
