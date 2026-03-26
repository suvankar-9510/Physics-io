'use client';
import { useRef, useEffect } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import { computeWKB } from '../../lib/simulation/wkb';

export default function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const { params } = useSimulationStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const padL = 50, padR = 20, padT = 20, padB = 40;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const xMin = -3, xMax = 3;
    const yMin = -1.5, yMax = 12;
    const barrierStart = -params.barrierWidth / 2;
    const barrierEnd = params.barrierWidth / 2;

    function toCanvasX(x: number) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function toCanvasY(y: number) { return padT + plotH - (y - yMin) / (yMax - yMin) * plotH; }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = '#0f172a';
      ctx!.fillRect(0, 0, W, H);

      // Grid lines
      ctx!.strokeStyle = '#1e293b';
      ctx!.lineWidth = 1;
      for (let v = 0; v <= 10; v += 2) {
        ctx!.beginPath();
        ctx!.moveTo(padL, toCanvasY(v));
        ctx!.lineTo(W - padR, toCanvasY(v));
        ctx!.stroke();
      }

      // Shade regions
      const barrierXStart = toCanvasX(barrierStart);
      const barrierXEnd = toCanvasX(barrierEnd);
      const barrierXRight = toCanvasX(xMax);

      // Green allowed (left)
      ctx!.fillStyle = 'rgba(34,197,94,0.08)';
      ctx!.fillRect(padL, padT, barrierXStart - padL, plotH);
      // Red forbidden (middle)
      ctx!.fillStyle = 'rgba(239,68,68,0.12)';
      ctx!.fillRect(barrierXStart, padT, barrierXEnd - barrierXStart, plotH);
      // Green allowed (right)
      ctx!.fillStyle = 'rgba(34,197,94,0.08)';
      ctx!.fillRect(barrierXEnd, padT, barrierXRight - barrierXEnd, plotH);

      // Draw potential V(x)
      ctx!.beginPath();
      ctx!.strokeStyle = '#60a5fa';
      ctx!.lineWidth = 2.5;
      ctx!.moveTo(padL, toCanvasY(0));
      ctx!.lineTo(toCanvasX(barrierStart), toCanvasY(0));
      ctx!.lineTo(toCanvasX(barrierStart), toCanvasY(params.barrierHeight));
      ctx!.lineTo(toCanvasX(barrierEnd), toCanvasY(params.barrierHeight));
      ctx!.lineTo(toCanvasX(barrierEnd), toCanvasY(0));
      ctx!.lineTo(W - padR, toCanvasY(0));
      ctx!.stroke();

      // Draw energy E (orange dashed)
      ctx!.setLineDash([8, 5]);
      ctx!.strokeStyle = '#fb923c';
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(padL, toCanvasY(params.particleEnergy));
      ctx!.lineTo(W - padR, toCanvasY(params.particleEnergy));
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Energy label
      ctx!.fillStyle = '#fb923c';
      ctx!.font = '12px monospace';
      ctx!.fillText(`E = ${params.particleEnergy.toFixed(1)} eV`, padL + 4, toCanvasY(params.particleEnergy) - 6);

      // Draw WKB wavefunction
      const points = computeWKB(params.barrierHeight, params.particleEnergy, params.barrierWidth, params.waveNumber, t);
      ctx!.beginPath();
      ctx!.strokeStyle = '#a78bfa';
      ctx!.lineWidth = 2;
      const psiScale = 1.2;
      const psiBaseline = params.particleEnergy;

      points.forEach((p, i) => {
        const cx = toCanvasX(p.x);
        const cy = toCanvasY(psiBaseline + p.psi * psiScale);
        if (i === 0) ctx!.moveTo(cx, cy);
        else ctx!.lineTo(cx, cy);
      });
      ctx!.stroke();

      // Axes
      ctx!.strokeStyle = '#94a3b8';
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(padL, padT);
      ctx!.lineTo(padL, H - padB);
      ctx!.lineTo(W - padR, H - padB);
      ctx!.stroke();

      // Axis labels
      ctx!.fillStyle = '#94a3b8';
      ctx!.font = '11px sans-serif';
      ctx!.fillText('V(x), E (eV)', 4, padT + 10);
      ctx!.fillText('x (nm)', W / 2, H - 6);

      // Y-axis ticks
      for (let v = 0; v <= 10; v += 2) {
        const cy = toCanvasY(v);
        ctx!.fillStyle = '#64748b';
        ctx!.fillText(String(v), 2, cy + 4);
      }

      // Legend
      ctx!.fillStyle = '#60a5fa';
      ctx!.fillRect(W - 120, padT + 10, 12, 3);
      ctx!.fillStyle = '#94a3b8';
      ctx!.font = '10px sans-serif';
      ctx!.fillText('V(x)', W - 104, padT + 14);

      ctx!.fillStyle = '#fb923c';
      ctx!.fillRect(W - 120, padT + 26, 12, 3);
      ctx!.fillStyle = '#94a3b8';
      ctx!.fillText('E', W - 104, padT + 30);

      ctx!.fillStyle = '#a78bfa';
      ctx!.fillRect(W - 120, padT + 42, 12, 3);
      ctx!.fillStyle = '#94a3b8';
      ctx!.fillText('ψ(x)', W - 104, padT + 46);
    }

    function animate() {
      timeRef.current += 0.03;
      draw(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [params]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl">
      <canvas
        ref={canvasRef}
        width={560}
        height={340}
        className="w-full h-auto"
        style={{ background: '#0f172a' }}
      />
    </div>
  );
}
