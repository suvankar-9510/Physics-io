export interface WKBPoint {
  x: number;
  psi: number;
}

export function computeWKB(
  barrierHeight: number,
  particleEnergy: number,
  barrierWidth: number,
  waveNumber: number,
  time: number,
  numPoints: number = 400
): WKBPoint[] {
  const points: WKBPoint[] = [];
  const xMin = -3;
  const xMax = 3;
  const dx = (xMax - xMin) / numPoints;
  const barrierStart = -barrierWidth / 2;
  const barrierEnd = barrierWidth / 2;

  for (let i = 0; i <= numPoints; i++) {
    const x = xMin + i * dx;
    const V = x >= barrierStart && x <= barrierEnd ? barrierHeight : 0;
    let psi: number;

    if (V < particleEnergy) {
      // Classically allowed: oscillatory
      const k = waveNumber * Math.sqrt(particleEnergy - V);
      psi = Math.sin(k * x * 3 - time * 2) / Math.sqrt(k || 0.01);
    } else {
      // Classically forbidden: exponential decay
      const kappa = waveNumber * Math.sqrt(Math.max(V - particleEnergy, 0.01));
      const distIntoBarrier = x > 0
        ? Math.max(0, x - barrierStart)
        : Math.max(0, barrierEnd - x);
      const decay = Math.exp(-kappa * distIntoBarrier * 2);
      const phase = x < 0 ? Math.sin(-barrierStart * waveNumber * 3 - time * 2) : Math.sin(barrierEnd * waveNumber * 3 - time * 2);
      psi = decay * phase;
    }

    points.push({ x, psi });
  }

  return points;
}
