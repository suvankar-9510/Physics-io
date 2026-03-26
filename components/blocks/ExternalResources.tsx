const resources = [
  { title: 'Griffiths QM, Ch. 9', type: 'Textbook', url: '#', description: 'The canonical undergraduate treatment of the WKB method.' },
  { title: 'Shankar, Ch. 16', type: 'Textbook', url: '#', description: 'Rigorous derivation with connection formula details.' },
  { title: 'MIT OCW 8.05', type: 'Lecture Notes', url: 'https://ocw.mit.edu', description: 'Barton Zwiebach lecture notes on the WKB approximation.' },
  { title: 'Feynman Lectures Vol. III', type: 'Reference', url: 'https://feynmanlectures.caltech.edu', description: "Feynman's perspective on quantum tunnelling phenomena." },
];

const typeColors: Record<string, string> = {
  Textbook: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Lecture Notes': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Reference: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

export default function ExternalResources() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-md">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">External Resources</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((r, i) => (
          <a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:shadow-md transition-all block"
          >
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[r.type] || 'bg-slate-200 text-slate-700'}`}>{r.type}</span>
            <p className="font-semibold text-sm text-slate-900 dark:text-white mt-2 mb-1">{r.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{r.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
