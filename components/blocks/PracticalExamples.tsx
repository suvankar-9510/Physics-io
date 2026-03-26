import LiveFormula from '../theory/LiveFormula';

const examples = [
  {
    title: 'Alpha Decay (Geiger-Nuttall Law)',
    description: 'An alpha particle tunnels through the Coulomb barrier of a nucleus. The WKB approximation gives the tunnelling probability, explaining the enormous variation in half-lives.',
    formula: '\\ln \\lambda \\approx -2\\int_{R}^{R_c} \\kappa(r)\\, dr + C',
    result: 'Half-lives ranging from microseconds to billions of years are explained by small changes in Q-value.',
  },
  {
    title: 'Quantum Tunnelling in STM',
    description: 'In a scanning tunnelling microscope, electrons tunnel across the vacuum gap between tip and sample. The exponential sensitivity to gap width provides sub-angstrom resolution.',
    formula: 'I \\propto V_{\\text{bias}} \\cdot e^{-2\\kappa d}',
    result: 'A 1 Å change in gap distance changes the tunnelling current by ~10×.',
  },
  {
    title: 'Harmonic Oscillator via WKB',
    description: 'Applying the Bohr-Sommerfeld quantisation rule to the harmonic oscillator reproduces the exact energy levels.',
    formula: '\\oint p\\, dq = \\left(n + \\tfrac{1}{2}\\right) h \\implies E_n = \\left(n + \\tfrac{1}{2}\\right)\\hbar\\omega',
    result: 'WKB recovers the exact quantum result — a remarkable coincidence for the harmonic oscillator.',
  },
];

export default function PracticalExamples() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-md">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Practical Examples</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {examples.map((ex, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <div className="text-2xl mb-2">{['⚛️', '🔬', '🎵'][i]}</div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">{ex.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{ex.description}</p>
            <div className="bg-white dark:bg-slate-800 rounded p-2 overflow-x-auto mb-3 border border-slate-100 dark:border-slate-700">
              <LiveFormula formula={ex.formula} displayMode={false} className="text-center text-sm" />
            </div>
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">💡 {ex.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
