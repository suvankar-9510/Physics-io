'use client';
import { useEffect, useState } from 'react';
import { useSimulationStore } from '../../store/simulationStore';
import LiveFormula from './LiveFormula';

interface FormulaBlock {
  id: string;
  label: string;
  formula: string;
  relatedParams: string[];
  text: string;
}

const formulaBlocks: FormulaBlock[] = [
  {
    id: 'wkb-wavefunction',
    label: 'WKB Wavefunction',
    formula: '\\psi(x) \\approx \\frac{A}{\\sqrt{p(x)}} \\exp\\left(\\pm \\frac{i}{\\hbar} \\int p(x)\\, dx\\right)',
    relatedParams: ['particleEnergy', 'waveNumber'],
    text: 'In the classically allowed region, the WKB wavefunction oscillates with a slowly varying amplitude inversely proportional to the square root of the classical momentum.',
  },
  {
    id: 'momentum',
    label: 'Classical Momentum',
    formula: 'p(x) = \\sqrt{2m(E - V(x))}',
    relatedParams: ['particleEnergy', 'barrierHeight'],
    text: 'The local momentum p(x) determines the local wavelength of the wavefunction. When E < V(x), p(x) becomes imaginary, leading to exponential behaviour.',
  },
  {
    id: 'tunnelling',
    label: 'Tunnelling Probability',
    formula: 'T \\approx \\exp\\left(-2 \\int_{x_1}^{x_2} \\kappa(x)\\, dx\\right)',
    relatedParams: ['barrierHeight', 'barrierWidth', 'particleEnergy'],
    text: 'In the classically forbidden region, the wavefunction decays exponentially. The tunnelling probability depends exponentially on the barrier width and height.',
  },
  {
    id: 'decay',
    label: 'Decay Constant',
    formula: '\\kappa(x) = \\frac{1}{\\hbar}\\sqrt{2m(V(x) - E)}',
    relatedParams: ['barrierHeight', 'particleEnergy', 'barrierWidth'],
    text: 'The decay constant κ governs how quickly the wavefunction decays inside the barrier. A larger barrier height or smaller particle energy increases κ, reducing tunnelling.',
  },
];

export default function TheorySection() {
  const { lastChanged } = useSimulationStore();
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!lastChanged) return;
    const newHighlights = new Set<string>();
    formulaBlocks.forEach(block => {
      if (block.relatedParams.includes(lastChanged)) {
        newHighlights.add(block.id);
      }
    });
    setHighlighted(newHighlights);
    const timer = setTimeout(() => setHighlighted(new Set()), 2500);
    return () => clearTimeout(timer);
  }, [lastChanged]);

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-md">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Theory: WKB Approximation</h2>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
        The Wentzel–Kramers–Brillouin (WKB) approximation is a semi-classical method for solving the Schrödinger equation when the potential varies slowly compared to the de Broglie wavelength. Adjust the sliders above — relevant formulas will highlight in yellow.
      </p>
      <div className="space-y-5">
        {formulaBlocks.map(block => (
          <div
            key={block.id}
            className="rounded-lg p-4 border transition-all duration-300"
            style={{
              background: highlighted.has(block.id) ? '#FFF176' : undefined,
              borderColor: highlighted.has(block.id) ? '#f59e0b' : undefined,
              transition: 'background-color 0.3s ease',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-2">{block.label}</p>
            <LiveFormula
              formula={block.formula}
              className="overflow-x-auto py-2"
            />
            <p className="text-sm text-slate-600 dark:text-slate-500 mt-2">{block.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
