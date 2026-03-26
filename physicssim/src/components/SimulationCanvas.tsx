"use client";

import React, { useEffect, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';

export default function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { energy, potentialHeight, barrierWidth } = useSimulationStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive setup
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Coordinate mapping
    const mapX = (x: number) => width / 2 + x * 50;
    const mapY = (y: number) => height - y * 30 - 50;

    const render = () => {
      // Clear canvas
      ctx.fillStyle = '#1e1e24'; // Dark background
      ctx.fillRect(0, 0, width, height);

      // Draw Axes
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mapY(0));
      ctx.lineTo(width, mapY(0));
      ctx.stroke();

      // Draw Potential V(x)
      ctx.fillStyle = 'rgba(255, 100, 100, 0.2)'; // Classically forbidden region (V > E)
      ctx.fillRect(mapX(-barrierWidth / 2), 0, barrierWidth * 50, height);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mapX(-10), mapY(0));
      ctx.lineTo(mapX(-barrierWidth / 2), mapY(0));
      ctx.lineTo(mapX(-barrierWidth / 2), mapY(potentialHeight));
      ctx.lineTo(mapX(barrierWidth / 2), mapY(potentialHeight));
      ctx.lineTo(mapX(barrierWidth / 2), mapY(0));
      ctx.lineTo(mapX(10), mapY(0));
      ctx.stroke();

      // Draw Energy E
      ctx.strokeStyle = '#ffff00';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, mapY(energy));
      ctx.lineTo(width, mapY(energy));
      ctx.stroke();
      ctx.setLineDash([]);

      // Add labels
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText(`Energy (E): ${energy.toFixed(2)}`, 10, mapY(energy) - 10);
      ctx.fillText(`Potential (V0): ${potentialHeight.toFixed(2)}`, mapX(barrierWidth/2) + 10, mapY(potentialHeight) - 10);


      // Very basic WKB wavefunction visualization (Conceptual)
      ctx.strokeStyle = '#00ffff'; // Wavefunction color
      ctx.lineWidth = 2;
      ctx.beginPath();

      const time = Date.now() / 1000;

      for(let px = 0; px < width; px+=2) {
         const x = (px - width/2) / 50;
         let y = 0;

         if (x < -barrierWidth/2) {
             // Oscillatory incident
             const k = Math.sqrt(Math.abs(energy));
             y = Math.sin(k * x * 5 - time * 5);
         } else if (x >= -barrierWidth/2 && x <= barrierWidth/2) {
             // Exponential decay (if E < V0)
             if (energy < potentialHeight) {
                const kappa = Math.sqrt(potentialHeight - energy);
                const k = Math.sqrt(Math.abs(energy));
                const matchVal = Math.sin(k * (-barrierWidth/2) * 5 - time * 5);

                // roughly decay from left edge
                const dx = x - (-barrierWidth/2);
                y = matchVal * Math.exp(-kappa * dx * 2);
             } else {
                // Oscillatory over barrier
                const k = Math.sqrt(energy - potentialHeight);
                y = Math.sin(k * x * 5 - time * 5);
             }
         } else {
             // Oscillatory transmitted
              if (energy < potentialHeight) {
                const kappa = Math.sqrt(potentialHeight - energy);
                const decayFactor = Math.exp(-kappa * barrierWidth * 2);
                const k = Math.sqrt(Math.abs(energy));

                y = decayFactor * Math.sin(k * x * 5 - time * 5);
             } else {
                 const k = Math.sqrt(Math.abs(energy));
                 y = Math.sin(k * x * 5 - time * 5);
             }
         }

         // Offset wavefunction drawing relative to energy level
         const drawY = mapY(energy) - y * 30;

         if (px === 0) ctx.moveTo(px, drawY);
         else ctx.lineTo(px, drawY);
      }
      ctx.stroke();
    };

    let animationFrameId: number;
    const animate = () => {
      render();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);

  }, [energy, potentialHeight, barrierWidth]);

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden border bg-black">
       <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />

       <div className="absolute top-4 right-4 bg-black/60 p-2 rounded text-xs text-white backdrop-blur flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#ffff00] rounded-full inline-block"></span> Energy
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 border border-white inline-block"></span> Potential
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#00ffff] rounded-full inline-block"></span> Wavefunction
          </div>
       </div>
    </div>
  );
}
