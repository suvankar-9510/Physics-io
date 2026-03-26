import Link from 'next/link';

const connections = [
  { name: 'Connection Formulae', slug: 'connection-formulae', branch: 'quantum-mechanics', description: 'Patching WKB solutions across turning points.' },
  { name: 'Perturbation Theory', slug: 'perturbation-theory', branch: 'quantum-mechanics', description: 'Another approximation method complementary to WKB.' },
  { name: 'Harmonic Oscillator', slug: 'harmonic-oscillator', branch: 'quantum-mechanics', description: 'WKB recovers exact results for the harmonic oscillator.' },
  { name: 'Quantum Statistics', slug: 'quantum-statistics', branch: 'statistical-mechanics', description: 'Semi-classical density of states from WKB quantisation.' },
];

export default function TopicConnections() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-md">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Related Topics</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {connections.map((c, i) => (
          <Link
            key={i}
            href={`/${c.branch}/${c.slug}`}
            className="min-w-[200px] bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:shadow-md transition-all flex-shrink-0"
          >
            <p className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{c.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
