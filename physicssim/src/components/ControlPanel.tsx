"use client";

import React from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function ControlPanel() {
  const {
    energy, setEnergy,
    potentialHeight, setPotentialHeight,
    barrierWidth, setBarrierWidth,
    setHighlight
  } = useSimulationStore();

  const handleReset = () => {
    setEnergy(2.0);
    setPotentialHeight(4.0);
    setBarrierWidth(1.5);
  };

  return (
    <div className="flex flex-col h-full bg-card border rounded-lg p-4 text-card-foreground">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Control Panel
        </h2>
        <button
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Reset Defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6 flex-1">
        {/* Energy Slider */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Particle Energy (E)</label>
            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{energy.toFixed(2)} eV</span>
          </div>
          <input
            type="range"
            min="0.1" max="10" step="0.1"
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            onMouseEnter={() => setHighlight('energy')}
            onMouseLeave={() => setHighlight(null)}
            className="w-full accent-primary"
          />
        </div>

        {/* Potential Height Slider */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Barrier Height (V₀)</label>
            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{potentialHeight.toFixed(2)} eV</span>
          </div>
          <input
            type="range"
            min="0" max="10" step="0.1"
            value={potentialHeight}
            onChange={(e) => setPotentialHeight(parseFloat(e.target.value))}
            onMouseEnter={() => setHighlight('potential')}
            onMouseLeave={() => setHighlight(null)}
            className="w-full accent-primary"
          />
        </div>

        {/* Barrier Width Slider */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Barrier Width (a)</label>
            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{barrierWidth.toFixed(2)} nm</span>
          </div>
          <input
            type="range"
            min="0.1" max="5" step="0.1"
            value={barrierWidth}
            onChange={(e) => setBarrierWidth(parseFloat(e.target.value))}
            onMouseEnter={() => setHighlight('width')}
            onMouseLeave={() => setHighlight(null)}
            className="w-full accent-primary"
          />
        </div>
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground border">
        Hover over sliders to highlight corresponding variables in the theory section below.
      </div>
    </div>
  );
}
