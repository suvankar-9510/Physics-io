'use client';
import { useSimulationStore } from '../../store/simulationStore';

interface SliderProps {
  label: string;
  unit: string;
  paramKey: 'barrierHeight' | 'particleEnergy' | 'barrierWidth' | 'waveNumber';
  min: number;
  max: number;
  step: number;
}

function Slider({ label, unit, paramKey, min, max, step }: SliderProps) {
  const { params, setParam } = useSimulationStore();
  const value = params[paramKey];

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400">{value.toFixed(2)} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => setParam(paramKey, parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function ControlPanel() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-md">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Simulation Parameters</h3>
      <Slider label="Barrier Height V₀" unit="eV" paramKey="barrierHeight" min={0} max={10} step={0.1} />
      <Slider label="Particle Energy E" unit="eV" paramKey="particleEnergy" min={0} max={8} step={0.1} />
      <Slider label="Barrier Width" unit="nm" paramKey="barrierWidth" min={0.5} max={3} step={0.05} />
      <Slider label="Wave Number k" unit="" paramKey="waveNumber" min={0.5} max={5} step={0.1} />
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
        🟢 Green = classically allowed &nbsp; 🔴 Red = forbidden region
      </p>
    </div>
  );
}
