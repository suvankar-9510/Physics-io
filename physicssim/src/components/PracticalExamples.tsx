"use client";

import React from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { Lightbulb, Play } from 'lucide-react';

const EXAMPLES = [
  {
    id: 1,
    title: "Alpha Decay Tunnelling",
    level: "BSc",
    description: "Model the escape of an alpha particle from a heavy nucleus via quantum tunnelling.",
    preset: { energy: 4.5, potentialHeight: 8.0, barrierWidth: 1.2 }
  },
  {
    id: 2,
    title: "Electron in a Wire Break",
    level: "MSc",
    description: "Tunnelling of an electron through a nanometer-scale air gap in a circuit.",
    preset: { energy: 1.2, potentialHeight: 3.5, barrierWidth: 0.8 }
  },
  {
    id: 3,
    title: "Over-barrier Transmission",
    level: "BSc",
    description: "Quantum reflection and transmission when energy exceeds the barrier height.",
    preset: { energy: 5.5, potentialHeight: 4.0, barrierWidth: 1.5 }
  }
];

export default function PracticalExamples() {
  const loadPreset = useSimulationStore(state => state.loadPreset);

  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Practical Examples</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXAMPLES.map(example => (
          <div key={example.id} className="bg-card text-card-foreground border rounded-lg p-5 flex flex-col hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{example.title}</h3>
              <span className="text-xs px-2 py-1 bg-muted rounded font-mono text-muted-foreground">
                {example.level}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
              {example.description}
            </p>
            <button
              onClick={() => {
                loadPreset(example.preset);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              Load in Simulation
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
